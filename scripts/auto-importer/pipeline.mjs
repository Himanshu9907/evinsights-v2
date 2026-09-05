/**
 * EVInsights Auto Importer
 * Main Import Pipeline
 *
 * Pipeline:
 *
 * Raw Input
 *    ↓
 * Source Adapter / Transformer
 *    ↓
 * CanonicalVehicle
 *    ↓
 * Validation
 *    ↓
 * Preview
 *    ↓
 * Pipeline Result
 *
 * IMPORTANT:
 *
 * This module does NOT:
 * - connect to database
 * - insert records
 * - update records
 * - delete records
 *
 * Database writing will be implemented separately.
 */

import {
  createCanonicalVehicle,
  isCanonicalVehicle
} from "./canonical-vehicle.mjs";

import {
  validateCanonicalVehicle,
  calculateCompleteness
} from "./validate.mjs";

import {
  createImportPreview,
  printImportPreview,
  canContinueImport
} from "./preview.mjs";


/**
 * Pipeline execution statuses.
 */
export const PIPELINE_STATUSES = Object.freeze({
  IDLE: "idle",

  STARTED: "started",

  TRANSFORMING: "transforming",

  VALIDATING: "validating",

  PREVIEWING: "previewing",

  COMPLETED: "completed",

  FAILED: "failed"
});


/**
 * Creates the initial pipeline result object.
 */
function createPipelineResult(options = {}) {
  return {
    success: false,

    status: PIPELINE_STATUSES.IDLE,

    startedAt: null,

    completedAt: null,

    durationMs: null,

    vehicle: null,

    validation: null,

    preview: null,

    errors: [],

    warnings: [],

    steps: [],

    options: {
      printPreview: options.printPreview !== false,

      throwOnError: options.throwOnError === true,

      dryRun: true
    }
  };
}


/**
 * Adds a pipeline step.
 */
function addStep(
  result,
  name,
  status,
  message = null,
  data = null
) {
  result.steps.push({
    name,

    status,

    message,

    data,

    timestamp: new Date().toISOString()
  });
}


/**
 * Adds a pipeline error.
 */
function addPipelineError(
  result,
  message,
  error = null
) {
  result.errors.push({
    message,

    error: error
      ? {
          name: error.name || "Error",

          message: error.message || String(error)
        }
      : null,

    timestamp: new Date().toISOString()
  });
}


/**
 * Adds pipeline warnings.
 */
function addPipelineWarnings(
  result,
  warnings = []
) {
  for (const warning of warnings) {
    result.warnings.push(warning);
  }
}


/**
 * Creates a safe execution context.
 *
 * This context is passed to optional transformers.
 */
function createPipelineContext(options = {}) {
  return {
    mode: "dry-run",

    databaseEnabled: false,

    insertEnabled: false,

    updateEnabled: false,

    deleteEnabled: false,

    existingDataProtection: true,

    options
  };
}


/**
 * Ensures a transformed vehicle contains
 * mandatory importer safety settings.
 *
 * This is an additional safety layer.
 */
function enforceSafety(vehicle) {
  if (!vehicle.metadata) {
    vehicle.metadata = {};
  }

  vehicle.metadata.importMode = "safe-merge";

  vehicle.metadata.existingRecordProtection = true;

  vehicle.metadata.allowDelete = false;

  return vehicle;
}


/**
 * Ensures completeness metadata is updated.
 */
function updateCompleteness(vehicle) {
  if (!vehicle.metadata) {
    vehicle.metadata = {};
  }

  vehicle.metadata.completeness =
    calculateCompleteness(vehicle);

  vehicle.metadata.updatedAt =
    new Date().toISOString();

  return vehicle;
}


/**
 * Default transformer.
 *
 * Allows an already-created CanonicalVehicle
 * to pass directly through the pipeline.
 */
function defaultTransformer(input) {
  if (isCanonicalVehicle(input)) {
    return input;
  }

  return null;
}


/**
 * Runs the transformation stage.
 *
 * A transformer receives:
 *
 * transformer(rawInput, context)
 *
 * and must return a CanonicalVehicle.
 */
async function runTransformer(
  input,
  transformer,
  context
) {
  const activeTransformer =
    transformer || defaultTransformer;

  const vehicle =
    await activeTransformer(input, context);

  if (!vehicle) {
    throw new Error(
      "Transformer returned no vehicle."
    );
  }

  if (!isCanonicalVehicle(vehicle)) {
    throw new Error(
      "Transformer did not return a valid CanonicalVehicle structure."
    );
  }

  return vehicle;
}


/**
 * Main Auto Import Pipeline.
 *
 * @param {*} input
 *
 * @param {object} options
 *
 * @param {Function} options.transformer
 * Function responsible for converting raw input
 * into a CanonicalVehicle.
 *
 * @param {boolean} options.printPreview
 *
 * @param {boolean} options.throwOnError
 *
 * @returns {Promise<object>}
 */
export async function runImportPipeline(
  input,
  options = {}
) {
  const result =
    createPipelineResult(options);

  const context =
    createPipelineContext(options);

  const startTime = Date.now();

  result.startedAt =
    new Date().toISOString();

  result.status =
    PIPELINE_STATUSES.STARTED;


  try {
    /**
     * --------------------------------------------------
     * STEP 1
     * PIPELINE START
     * --------------------------------------------------
     */

    addStep(
      result,
      "pipeline-start",
      "completed",
      "Auto Import pipeline started."
    );


    /**
     * --------------------------------------------------
     * STEP 2
     * TRANSFORMATION
     * --------------------------------------------------
     */

    result.status =
      PIPELINE_STATUSES.TRANSFORMING;

    addStep(
      result,
      "transform",
      "started",
      "Transforming input into CanonicalVehicle."
    );

    const vehicle =
      await runTransformer(
        input,
        options.transformer,
        context
      );

    result.vehicle =
      enforceSafety(vehicle);

    updateCompleteness(result.vehicle);

    addStep(
      result,
      "transform",
      "completed",
      "CanonicalVehicle created successfully."
    );


    /**
     * --------------------------------------------------
     * STEP 3
     * VALIDATION
     * --------------------------------------------------
     */

    result.status =
      PIPELINE_STATUSES.VALIDATING;

    addStep(
      result,
      "validation",
      "started",
      "Validating CanonicalVehicle."
    );

    const validation =
      validateCanonicalVehicle(result.vehicle);

    result.validation =
      validation;

    addPipelineWarnings(
      result,
      validation.warnings
    );

    if (!validation.valid) {
      addStep(
        result,
        "validation",
        "failed",
        `${validation.errors.length} validation error(s) found.`,
        validation.errors
      );

      result.status =
        PIPELINE_STATUSES.FAILED;

      result.completedAt =
        new Date().toISOString();

      result.durationMs =
        Date.now() - startTime;

      return handlePipelineFailure(
        result,
        options
      );
    }

    addStep(
      result,
      "validation",
      "completed",
      "Vehicle passed validation."
    );


    /**
     * --------------------------------------------------
     * STEP 4
     * CONTINUATION SAFETY CHECK
     * --------------------------------------------------
     */

    const canContinue =
      canContinueImport(
        result.vehicle,
        validation
      );

    if (!canContinue) {
      const error =
        new Error(
          "Pipeline safety check failed. Import cannot continue."
        );

      addPipelineError(
        result,
        error.message,
        error
      );

      addStep(
        result,
        "safety-check",
        "failed",
        error.message
      );

      result.status =
        PIPELINE_STATUSES.FAILED;

      result.completedAt =
        new Date().toISOString();

      result.durationMs =
        Date.now() - startTime;

      return handlePipelineFailure(
        result,
        options
      );
    }

    addStep(
      result,
      "safety-check",
      "completed",
      "All importer safety checks passed."
    );


    /**
     * --------------------------------------------------
     * STEP 5
     * PREVIEW
     * --------------------------------------------------
     */

    result.status =
      PIPELINE_STATUSES.PREVIEWING;

    addStep(
      result,
      "preview",
      "started",
      "Generating import preview."
    );

    const preview =
      createImportPreview(
        result.vehicle,
        validation
      );

    result.preview =
      preview;

    if (options.printPreview !== false) {
      printImportPreview(
        result.vehicle,
        validation
      );
    }

    addStep(
      result,
      "preview",
      "completed",
      "Import preview generated successfully."
    );


    /**
     * --------------------------------------------------
     * STEP 6
     * PIPELINE COMPLETE
     * --------------------------------------------------
     */

    result.success = true;

    result.status =
      PIPELINE_STATUSES.COMPLETED;

    result.completedAt =
      new Date().toISOString();

    result.durationMs =
      Date.now() - startTime;

    addStep(
      result,
      "pipeline-complete",
      "completed",
      "Auto Import pipeline completed successfully."
    );

    return result;

  } catch (error) {
    result.success = false;

    result.status =
      PIPELINE_STATUSES.FAILED;

    addPipelineError(
      result,
      error.message ||
        "Unknown pipeline error.",
      error
    );

    addStep(
      result,
      "pipeline-error",
      "failed",
      error.message ||
        "Unknown pipeline error."
    );

    result.completedAt =
      new Date().toISOString();

    result.durationMs =
      Date.now() - startTime;

    return handlePipelineFailure(
      result,
      options
    );
  }
}


/**
 * Handles pipeline failure.
 */
function handlePipelineFailure(
  result,
  options
) {
  if (options.throwOnError === true) {
    const messages =
      result.errors
        .map(error => error.message)
        .join("\n");

    throw new Error(
      messages ||
      "Auto Import pipeline failed."
    );
  }

  return result;
}


/**
 * Creates a pipeline runner with
 * preconfigured options.
 *
 * Useful for specific importers.
 */
export function createImportPipeline(
  defaultOptions = {}
) {
  return {
    async run(input, options = {}) {
      return runImportPipeline(
        input,
        {
          ...defaultOptions,
          ...options
        }
      );
    }
  };
}


/**
 * Returns a human-readable pipeline summary.
 */
export function getPipelineSummary(result) {
  if (!result) {
    return {
      success: false,

      status: "unknown",

      message: "No pipeline result available."
    };
  }

  return {
    success: result.success,

    status: result.status,

    vehicle:
      result.vehicle?.identity?.name ||
      null,

    brand:
      result.vehicle?.identity?.brand?.name ||
      null,

    completeness:
      result.vehicle?.metadata?.completeness ||
      0,

    validationErrors:
      result.validation?.errors?.length ||
      0,

    validationWarnings:
      result.validation?.warnings?.length ||
      0,

    durationMs:
      result.durationMs,

    databaseMode: "dry-run",

    databaseTouched: false,

    deleteOperations: false
  };
}


/**
 * Prints a compact pipeline summary.
 */
export function printPipelineSummary(result) {
  const summary =
    getPipelineSummary(result);

  console.log("\nAUTO IMPORT PIPELINE SUMMARY");
  console.log("--------------------------------");

  console.log(
    `Status: ${summary.status}`
  );

  console.log(
    `Success: ${summary.success}`
  );

  console.log(
    `Vehicle: ${summary.vehicle || "N/A"}`
  );

  console.log(
    `Brand: ${summary.brand || "N/A"}`
  );

  console.log(
    `Completeness: ${summary.completeness}%`
  );

  console.log(
    `Validation Errors: ${summary.validationErrors}`
  );

  console.log(
    `Validation Warnings: ${summary.validationWarnings}`
  );

  console.log(
    `Duration: ${summary.durationMs ?? 0}ms`
  );

  console.log(
    `Database: ${summary.databaseMode}`
  );

  console.log(
    `Database Touched: ${summary.databaseTouched}`
  );

  console.log(
    `DELETE Operations: ${summary.deleteOperations}`
  );

  console.log("\n");

  return summary;
}


/**
 * Helper for testing an empty pipeline.
 *
 * Mainly useful during development.
 */
export function createEmptyPipelineVehicle() {
  return createCanonicalVehicle();
}