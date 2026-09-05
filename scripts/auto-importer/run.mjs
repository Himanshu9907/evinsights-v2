// /**
//  * EVInsights Auto Importer
//  * Pipeline Runner
//  *
//  * Entry point for running a complete vehicle import dry-run.
//  *
//  * Flow:
//  *
//  * Source
//  *   ↓
//  * Source Result
//  *   ↓
//  * Transformer
//  *   ↓
//  * CanonicalVehicle
//  *   ↓
//  * Pipeline
//  *   ↓
//  * Validation
//  *   ↓
//  * Preview
//  *
//  * IMPORTANT:
//  * This runner does NOT write to the database.
//  */

// import {
//   loadManualSource,
//   isValidSourceResult
// } from "./sources/index.mjs";

// import {
//   transformVehicle
// } from "./transformers/index.mjs";

// import {
//   runImportPipeline,
//   printPipelineSummary
// } from "./pipeline.mjs";


// /**
//  * Runs a complete auto-import dry-run.
//  *
//  * @param {object} rawVehicleData
//  * @param {object} options
//  *
//  * @returns {Promise<object>}
//  */
// export async function runAutoImporter(
//   rawVehicleData,
//   options = {}
// ) {
//   console.log("\n");
//   console.log("============================================================");
//   console.log("              EVINSIGHTS AUTO IMPORTER");
//   console.log("============================================================");

//   console.log("\n[1/4] Loading source data...\n");


//   /**
//    * STEP 1
//    * Load source data.
//    */
//   const sourceResult =
//     await loadManualSource(rawVehicleData);


//   if (!isValidSourceResult(sourceResult)) {
//     throw new Error(
//       "Source returned an invalid source result."
//     );
//   }


//   if (!sourceResult.success) {
//     console.error(
//       "SOURCE FAILED"
//     );

//     console.error(
//       JSON.stringify(
//         sourceResult.errors,
//         null,
//         2
//       )
//     );

//     return {
//       success: false,

//       stage: "source",

//       source: sourceResult,

//       pipeline: null
//     };
//   }


//   console.log(
//     `Source: ${sourceResult.sourceName}`
//   );

//   console.log(
//     `Source Type: ${sourceResult.sourceType}`
//   );

//   console.log(
//     "Source Status: SUCCESS"
//   );


//   if (sourceResult.warnings.length > 0) {
//     console.log(
//       `Source Warnings: ${sourceResult.warnings.length}`
//     );
//   }


//   console.log("\n[2/4] Preparing transformer...\n");


//   /**
//    * STEP 2
//    * Create transformer wrapper.
//    *
//    * Pipeline expects:
//    *
//    * transformer(input, context)
//    */
//   const transformer = async (
//     sourceData,
//     context
//   ) => {
//     return transformVehicle(
//       sourceData,
//       context
//     );
//   };


//   console.log(
//     "Transformer: Generic Vehicle Transformer"
//   );

//   console.log(
//     "Transformer Status: READY"
//   );


//   console.log("\n[3/4] Running import pipeline...\n");


//   /**
//    * STEP 3
//    * Run pipeline.
//    */
//   const pipelineResult =
//     await runImportPipeline(
//       sourceResult.data,
//       {
//         transformer,

//         printPreview:
//           options.printPreview !== false,

//         throwOnError:
//           options.throwOnError === true
//       }
//     );


//   console.log("\n[4/4] Pipeline finished.\n");


//   /**
//    * STEP 4
//    * Print final summary.
//    */
//   printPipelineSummary(
//     pipelineResult
//   );


//   console.log("============================================================");
//   console.log(
//     pipelineResult.success
//       ? "AUTO IMPORT DRY-RUN COMPLETED SUCCESSFULLY"
//       : "AUTO IMPORT DRY-RUN FAILED"
//   );
//   console.log("============================================================\n");


//   return {
//     success:
//       pipelineResult.success,

//     stage:
//       pipelineResult.success
//         ? "completed"
//         : "pipeline",

//     source:
//       sourceResult,

//     pipeline:
//       pipelineResult
//   };
// }


// /**
//  * CLI error handler.
//  */
// function handleCliError(error) {
//   console.error("\n");

//   console.error(
//     "AUTO IMPORTER EXECUTION ERROR"
//   );

//   console.error(
//     "------------------------------------------------------------"
//   );

//   console.error(
//     error?.message ||
//     String(error)
//   );

//   console.error("\n");

//   process.exitCode = 1;
// }


// /**
//  * Check whether this file
//  * is executed directly.
//  */
// const isDirectExecution =
//   process.argv[1] &&
//   import.meta.url ===
//     new URL(
//       `file://${process.argv[1]}`
//     ).href;


// /**
//  * Direct CLI execution.
//  *
//  * Currently this only shows a message.
//  *
//  * Real vehicle data will be passed
//  * from a dedicated test file.
//  */
// if (isDirectExecution) {
//   console.log("\n");
//   console.log(
//     "EVInsights Auto Importer Runner"
//   );

//   console.log(
//     "Runner loaded successfully."
//   );

//   console.log(
//     "Waiting for vehicle input..."
//   );

//   console.log("\n");

//   /**
//    * No automatic import here.
//    *
//    * This prevents accidental execution
//    * with empty or unknown data.
//    */
// }


// /**
//  * Optional programmatic runner.
//  */
// export async function executeVehicleImport(
//   vehicleData,
//   options = {}
// ) {
//   try {
//     return await runAutoImporter(
//       vehicleData,
//       options
//     );

//   } catch (error) {
//     handleCliError(error);

//     return {
//       success: false,

//       stage: "execution",

//       error: {
//         message:
//           error.message ||
//           String(error)
//       }
//     };
//   }
// }


/**
 * EVInsights Auto Importer
 * Pipeline Runner
 *
 * Entry point for running a complete vehicle import dry-run.
 *
 * Flow:
 *
 * Raw Input
 *   ↓
 * Source Registry
 *   ↓
 * Selected Source Adapter
 *   ↓
 * Source Result
 *   ↓
 * Transformer
 *   ↓
 * CanonicalVehicle
 *   ↓
 * Pipeline
 *   ↓
 * Validation
 *   ↓
 * Preview
 *
 * IMPORTANT:
 *
 * This runner does NOT:
 *
 * - write to database
 * - insert records
 * - update records
 * - delete records
 */

import {
  getSource
} from "./sources/index.mjs";

import {
  transformVehicle
} from "./transformers/index.mjs";

import {
  runImportPipeline,
  printPipelineSummary
} from "./pipeline.mjs";

import {
  executeSourceAdapter,
  isValidSourceResult
} from "./sources/source.interface.mjs";


/**
 * Default source name.
 *
 * Manual source remains the default for
 * backwards compatibility and testing.
 */
const DEFAULT_SOURCE = "Manual Source";


/**
 * Validates the basic SourceResult structure.
 *
 * This remains local to the runner so that
 * source adapters can evolve independently.
 */
function isValidSourceResult(result) {
  if (
    !result ||
    typeof result !== "object"
  ) {
    return false;
  }

  return Boolean(
    typeof result.success === "boolean" &&
    result.status &&
    result.source &&
    typeof result.source === "object"
  );
}


/**
 * Gets source display name safely.
 */
function getSourceName(sourceResult) {
  return (
    sourceResult?.source?.name ||
    sourceResult?.sourceName ||
    "Unknown Source"
  );
}


/**
 * Gets source type safely.
 */
function getSourceType(sourceResult) {
  return (
    sourceResult?.source?.type ||
    sourceResult?.sourceType ||
    "unknown"
  );
}


/**
 * Resolves the requested source adapter.
 *
 * @param {object} options
 *
 * @returns {object}
 */
function resolveSourceAdapter(options = {}) {
  const sourceName =
    options.source ||
    options.sourceName ||
    DEFAULT_SOURCE;

  const source =
    getSource(sourceName);

  if (!source) {
    throw new Error(
      `Source adapter not found: ${sourceName}`
    );
  }

  if (source.enabled === false) {
    throw new Error(
      `Source adapter is disabled: ${sourceName}`
    );
  }

  if (
    typeof source.fetch !== "function"
  ) {
    throw new Error(
      `Source adapter does not implement fetch(): ${sourceName}`
    );
  }

  return source;
}


/**
 * Runs a complete auto-import dry-run.
 *
 * @param {object} rawVehicleData
 *
 * @param {object} options
 *
 * @param {string} options.source
 * Source adapter name.
 *
 * @param {boolean} options.printPreview
 *
 * @param {boolean} options.throwOnError
 *
 * @returns {Promise<object>}
 */
export async function runAutoImporter(
  rawVehicleData,
  options = {}
) {
  console.log("\n");

  console.log(
    "============================================================"
  );

  console.log(
    "              EVINSIGHTS AUTO IMPORTER"
  );

  console.log(
    "============================================================"
  );


  /**
   * =========================================================
   * STEP 1
   * SOURCE
   * =========================================================
   */

  console.log(
    "\n[1/4] Loading source data...\n"
  );


  let sourceAdapter;

  let sourceResult;


  try {
    sourceAdapter =
      resolveSourceAdapter(options);

    // sourceResult =
    //   await sourceAdapter.fetch(
    //     rawVehicleData,
    //     {
    //       mode: "dry-run",

    //       databaseEnabled: false,

    //       existingDataProtection: true,

    //       allowDelete: false,

    //       options
    //     }
    //   );

    sourceResult =
  await executeSourceAdapter(
    sourceAdapter,
    rawVehicleData,
    {
      mode: "dry-run",

      databaseEnabled: false,

      insertEnabled: false,

      updateEnabled: false,

      deleteEnabled: false,

      existingDataProtection: true,

      allowDelete: false,

      options
    }
  );

  } catch (error) {
    console.error(
      "SOURCE EXECUTION FAILED"
    );

    console.error(
      error.message || String(error)
    );

    return {
      success: false,

      stage: "source",

      source: null,

      pipeline: null,

      error: {
        message:
          error.message ||
          String(error)
      }
    };
  }


  /**
   * Validate SourceResult contract.
   */
  if (!isValidSourceResult(sourceResult)) {
    throw new Error(
      "Source returned an invalid SourceResult structure."
    );
  }


  /**
   * Handle source failure.
   */
  if (!sourceResult.success) {
    console.error(
      "SOURCE FAILED"
    );

    if (
      Array.isArray(
        sourceResult.errors
      )
    ) {
      console.error(
        JSON.stringify(
          sourceResult.errors,
          null,
          2
        )
      );
    }

    return {
      success: false,

      stage: "source",

      source: sourceResult,

      pipeline: null
    };
  }


  /**
   * Print source information.
   */
  console.log(
    `Source: ${getSourceName(sourceResult)}`
  );

  console.log(
    `Source Type: ${getSourceType(sourceResult)}`
  );

  console.log(
    "Source Status: SUCCESS"
  );


  if (
    Array.isArray(
      sourceResult.warnings
    ) &&
    sourceResult.warnings.length > 0
  ) {
    console.log(
      `Source Warnings: ${sourceResult.warnings.length}`
    );
  }


  /**
   * =========================================================
   * STEP 2
   * TRANSFORMER
   * =========================================================
   */

  console.log(
    "\n[2/4] Preparing transformer...\n"
  );


  /**
   * Pipeline transformer wrapper.
   *
   * Pipeline contract:
   *
   * transformer(input, context)
   */
  const transformer = async (
    sourceData,
    context
  ) => {
    return transformVehicle(
      sourceData,
      context
    );
  };


  console.log(
    "Transformer: Generic Vehicle Transformer"
  );

  console.log(
    "Transformer Status: READY"
  );


  /**
   * =========================================================
   * STEP 3
   * PIPELINE
   * =========================================================
   */

  console.log(
    "\n[3/4] Running import pipeline...\n"
  );


  const pipelineResult =
    await runImportPipeline(
      sourceResult.data,
      {
        transformer,

        printPreview:
          options.printPreview !== false,

        throwOnError:
          options.throwOnError === true,

        dryRun: true
      }
    );


  /**
   * =========================================================
   * STEP 4
   * SUMMARY
   * =========================================================
   */

  console.log(
    "\n[4/4] Pipeline finished.\n"
  );


  printPipelineSummary(
    pipelineResult
  );


  console.log(
    "============================================================"
  );

  console.log(
    pipelineResult.success
      ? "AUTO IMPORT DRY-RUN COMPLETED SUCCESSFULLY"
      : "AUTO IMPORT DRY-RUN FAILED"
  );

  console.log(
    "============================================================\n"
  );


  /**
   * Final result.
   */
  return {
    success:
      pipelineResult.success,

    stage:
      pipelineResult.success
        ? "completed"
        : "pipeline",

    source:
      sourceResult,

    sourceAdapter: {
      name:
        sourceAdapter.name,

      type:
        sourceAdapter.type,

      priority:
        sourceAdapter.priority || 0
    },

    pipeline:
      pipelineResult
  };
}


/**
 * CLI error handler.
 *
 * Does NOT terminate database processes.
 * Only sets the Node process exit code.
 */
function handleCliError(error) {
  console.error("\n");

  console.error(
    "AUTO IMPORTER EXECUTION ERROR"
  );

  console.error(
    "------------------------------------------------------------"
  );

  console.error(
    error?.message ||
    String(error)
  );

  console.error("\n");

  process.exitCode = 1;
}


/**
 * Check whether this file
 * is executed directly.
 */
const isDirectExecution =
  process.argv[1] &&
  import.meta.url ===
    new URL(
      `file://${process.argv[1]}`
    ).href;


/**
 * Direct CLI execution.
 *
 * No automatic vehicle import is performed.
 *
 * This prevents accidental imports with:
 *
 * - empty data
 * - unknown data
 * - database access
 */
if (isDirectExecution) {
  console.log("\n");

  console.log(
    "EVInsights Auto Importer Runner"
  );

  console.log(
    "Runner loaded successfully."
  );

  console.log(
    "Source Registry: READY"
  );

  console.log(
    "Waiting for vehicle input..."
  );

  console.log("\n");
}


/**
 * Optional programmatic runner.
 */
export async function executeVehicleImport(
  vehicleData,
  options = {}
) {
  try {
    return await runAutoImporter(
      vehicleData,
      options
    );

  } catch (error) {
    handleCliError(error);

    return {
      success: false,

      stage: "execution",

      source: null,

      pipeline: null,

      error: {
        message:
          error.message ||
          String(error)
      }
    };
  }
}