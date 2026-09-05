// /**
//  * EVInsights Auto Importer
//  * Source Interface Contract
//  *
//  * Every source adapter must follow this contract.
//  *
//  * Examples:
//  * - ManualSource
//  * - OfficialSource
//  * - CarDekhoSource
//  * - BrochureSource
//  * - API Source
//  */


// /**
//  * Supported source types.
//  */
// export const SOURCE_TYPES = Object.freeze({
//   MANUAL: "manual",
//   OFFICIAL: "official",
//   THIRD_PARTY: "third-party",
//   BROCHURE: "brochure",
//   API: "api"
// });


// /**
//  * Creates a standard source result.
//  */
// export function createSourceResult({
//   sourceType = SOURCE_TYPES.MANUAL,
//   sourceName = null,
//   success = false,
//   data = null,
//   sources = [],
//   errors = [],
//   warnings = [],
//   metadata = {}
// } = {}) {
//   return {
//     success,

//     sourceType,

//     sourceName,

//     data,

//     sources,

//     errors,

//     warnings,

//     metadata: {
//       fetchedAt: new Date().toISOString(),

//       ...metadata
//     }
//   };
// }


// /**
//  * Validates whether an object follows
//  * the basic source result contract.
//  */
// export function isValidSourceResult(result) {
//   if (!result || typeof result !== "object") {
//     return false;
//   }

//   if (typeof result.success !== "boolean") {
//     return false;
//   }

//   if (!result.sourceType) {
//     return false;
//   }

//   if (!Array.isArray(result.sources)) {
//     return false;
//   }

//   if (!Array.isArray(result.errors)) {
//     return false;
//   }

//   if (!Array.isArray(result.warnings)) {
//     return false;
//   }

//   return true;
// }


// /**
//  * Creates a standard source error.
//  */
// export function createSourceError(
//   message,
//   code = "SOURCE_ERROR",
//   details = null
// ) {
//   return {
//     code,

//     message,

//     details,

//     timestamp: new Date().toISOString()
//   };
// }


// /**
//  * Creates a standard source warning.
//  */
// export function createSourceWarning(
//   message,
//   code = "SOURCE_WARNING",
//   details = null
// ) {
//   return {
//     code,

//     message,

//     details,

//     timestamp: new Date().toISOString()
//   };
// }


/**
 * EVInsights Auto Importer
 * Source Adapter Interface
 *
 * Defines the common contract for every data source.
 *
 * All source adapters must follow this interface,
 * regardless of where data comes from.
 *
 * Examples:
 *
 * - Official manufacturer website
 * - Official brochure
 * - Press release
 * - Aggregator
 * - Manual data
 *
 * Pipeline:
 *
 * Source Adapter
 *      ↓
 * Source Result
 *      ↓
 * Normalized Raw Vehicle Data
 *      ↓
 * Generic Vehicle Transformer
 */

// import {
//   SOURCE_TYPES
// } from "../canonical-vehicle.mjs";


// /**
//  * Supported source execution statuses.
//  */
// export const SOURCE_STATUSES = Object.freeze({
//   IDLE: "idle",

//   FETCHING: "fetching",

//   SUCCESS: "success",

//   PARTIAL: "partial",

//   FAILED: "failed"
// });


// /**
//  * Creates a standard source result object.
//  *
//  * Every source adapter should return this structure.
//  *
//  * @param {object} overrides
//  * @returns {object}
//  */
// export function createSourceResult(overrides = {}) {
//   return {
//     /**
//      * Execution status.
//      */
//     success: false,

//     status: SOURCE_STATUSES.IDLE,


//     /**
//      * Source identity.
//      */
//     source: {
//       name: null,

//       type: "other",

//       url: null
//     },


//     /**
//      * Normalized raw vehicle data.
//      *
//      * This data will be passed to the
//      * Generic Vehicle Transformer.
//      */
//     data: null,


//     /**
//      * Source metadata.
//      */
//     metadata: {
//       fetchedAt: null,

//       durationMs: null,

//       confidence: 0
//     },


//     /**
//      * Errors encountered during extraction.
//      */
//     errors: [],


//     /**
//      * Non-blocking warnings.
//      */
//     warnings: [],


//     /**
//      * Optional evidence.
//      *
//      * Useful later for:
//      *
//      * - field verification
//      * - source comparison
//      * - conflict resolution
//      */
//     evidence: [],


//     ...overrides
//   };
// }


// /**
//  * Creates a standard source error.
//  *
//  * @param {string} message
//  * @param {object} options
//  *
//  * @returns {object}
//  */
// export function createSourceError(
//   message,
//   options = {}
// ) {
//   return {
//     message,

//     code:
//       options.code ||
//       "SOURCE_ERROR",

//     field:
//       options.field ||
//       null,

//     cause:
//       options.cause ||
//       null,

//     timestamp:
//       new Date().toISOString()
//   };
// }


// /**
//  * Creates a standard source warning.
//  *
//  * @param {string} message
//  * @param {object} options
//  *
//  * @returns {object}
//  */
// export function createSourceWarning(
//   message,
//   options = {}
// ) {
//   return {
//     message,

//     code:
//       options.code ||
//       "SOURCE_WARNING",

//     field:
//       options.field ||
//       null,

//     timestamp:
//       new Date().toISOString()
//   };
// }


// /**
//  * Validates a source adapter definition.
//  *
//  * A source adapter must provide:
//  *
//  * - name
//  * - type
//  * - fetch()
//  *
//  * @param {object} adapter
//  *
//  * @returns {boolean}
//  */
// export function isValidSourceAdapter(
//   adapter
// ) {
//   if (
//     !adapter ||
//     typeof adapter !== "object"
//   ) {
//     return false;
//   }

//   if (
//     typeof adapter.name !== "string" ||
//     !adapter.name.trim()
//   ) {
//     return false;
//   }

//   if (
//     typeof adapter.type !== "string" ||
//     !SOURCE_TYPES.includes(adapter.type)
//   ) {
//     return false;
//   }

//   if (
//     typeof adapter.fetch !== "function"
//   ) {
//     return false;
//   }

//   return true;
// }


// /**
//  * Executes a source adapter safely.
//  *
//  * This wrapper ensures that every source
//  * returns the same result structure.
//  *
//  * @param {object} adapter
//  * @param {object} input
//  * @param {object} context
//  *
//  * @returns {Promise<object>}
//  */
// export async function executeSourceAdapter(
//   adapter,
//   input = {},
//   context = {}
// ) {
//   const startedAt =
//     Date.now();

//   /**
//    * Validate adapter before execution.
//    */
//   if (!isValidSourceAdapter(adapter)) {
//     return createSourceResult({
//       success: false,

//       status: SOURCE_STATUSES.FAILED,

//       errors: [
//         createSourceError(
//           "Invalid source adapter.",
//           {
//             code: "INVALID_SOURCE_ADAPTER"
//           }
//         )
//       ],

//       metadata: {
//         fetchedAt:
//           new Date().toISOString(),

//         durationMs:
//           Date.now() - startedAt,

//         confidence: 0
//       }
//     });
//   }


//   try {
//     /**
//      * Execute adapter.
//      */
//     const result =
//       await adapter.fetch(
//         input,
//         context
//       );


//     /**
//      * Ensure adapter returned an object.
//      */
//     if (
//       !result ||
//       typeof result !== "object"
//     ) {
//       throw new Error(
//         "Source adapter returned an invalid result."
//       );
//     }


//     /**
//      * Normalize result into standard contract.
//      */
//     const normalizedResult =
//       createSourceResult({
//         ...result,

//         source: {
//           name:
//             result.source?.name ||
//             adapter.name,

//           type:
//             result.source?.type ||
//             adapter.type,

//           url:
//             result.source?.url ||
//             adapter.url ||
//             null
//         },

//         metadata: {
//           fetchedAt:
//             result.metadata?.fetchedAt ||
//             new Date().toISOString(),

//           durationMs:
//             Date.now() - startedAt,

//           confidence:
//             typeof result.metadata?.confidence === "number"
//               ? result.metadata.confidence
//               : 0
//         }
//       });


//     /**
//      * Ensure success result contains data.
//      */
//     if (
//       normalizedResult.success &&
//       !normalizedResult.data
//     ) {
//       normalizedResult.success = false;

//       normalizedResult.status =
//         SOURCE_STATUSES.FAILED;

//       normalizedResult.errors.push(
//         createSourceError(
//           "Source adapter succeeded but returned no data.",
//           {
//             code: "EMPTY_SOURCE_DATA"
//           }
//         )
//       );
//     }


//     return normalizedResult;

//   } catch (error) {
//     return createSourceResult({
//       success: false,

//       status: SOURCE_STATUSES.FAILED,

//       source: {
//         name: adapter.name,

//         type: adapter.type,

//         url:
//           adapter.url ||
//           null
//       },

//       metadata: {
//         fetchedAt:
//           new Date().toISOString(),

//         durationMs:
//           Date.now() - startedAt,

//         confidence: 0
//       },

//       errors: [
//         createSourceError(
//           error.message ||
//           "Unknown source adapter error.",
//           {
//             code: "SOURCE_EXECUTION_FAILED",

//             cause: {
//               name:
//                 error.name ||
//                 "Error",

//               message:
//                 error.message ||
//                 String(error)
//             }
//           }
//         )
//       ]
//     });
//   }
// }


// /**
//  * Creates a source adapter definition.
//  *
//  * This helper provides a consistent structure
//  * for all future adapters.
//  *
//  * @param {object} config
//  *
//  * @returns {object}
//  */
// export function createSourceAdapter(
//   config = {}
// ) {
//   const adapter = {
//     name:
//       config.name ||
//       "Unnamed Source",

//     type:
//       config.type ||
//       "other",

//     url:
//       config.url ||
//       null,

//     priority:
//       typeof config.priority === "number"
//         ? config.priority
//         : 0,

//     enabled:
//       config.enabled !== false,

//     fetch:
//       config.fetch
//   };


//   if (!isValidSourceAdapter(adapter)) {
//     throw new Error(
//       `Invalid source adapter configuration: ${adapter.name}`
//     );
//   }


//   return Object.freeze(adapter);
// }


import {
  SOURCE_TYPES
} from "../canonical-vehicle.mjs";


/**
 * Supported source execution statuses.
 */
export const SOURCE_STATUSES = Object.freeze({
  IDLE: "idle",

  FETCHING: "fetching",

  SUCCESS: "success",

  PARTIAL: "partial",

  FAILED: "failed"
});


/**
 * Creates a standard source result object.
 *
 * Every source adapter should return this structure.
 *
 * @param {object} overrides
 * @returns {object}
 */
export function createSourceResult(overrides = {}) {
  return {
    success: false,

    status: SOURCE_STATUSES.IDLE,

    source: {
      name: null,

      type: "other",

      url: null
    },

    /**
     * Normalized raw vehicle data.
     *
     * Passed to Generic Vehicle Transformer.
     */
    data: null,

    metadata: {
      fetchedAt: null,

      durationMs: null,

      confidence: 0
    },

    errors: [],

    warnings: [],

    evidence: [],

    ...overrides
  };
}


/**
 * Creates a standard source error.
 */
export function createSourceError(
  message,
  options = {}
) {
  return {
    message,

    code:
      options.code ||
      "SOURCE_ERROR",

    field:
      options.field ||
      null,

    cause:
      options.cause ||
      null,

    timestamp:
      new Date().toISOString()
  };
}


/**
 * Creates a standard source warning.
 */
export function createSourceWarning(
  message,
  options = {}
) {
  return {
    message,

    code:
      options.code ||
      "SOURCE_WARNING",

    field:
      options.field ||
      null,

    timestamp:
      new Date().toISOString()
  };
}


/**
 * Checks whether a result appears to be
 * a valid SourceResult.
 *
 * This is intentionally structural.
 * Detailed source validation remains
 * adapter-specific.
 */
export function isValidSourceResult(result) {
  if (
    !result ||
    typeof result !== "object"
  ) {
    return false;
  }

  if (
    typeof result.success !== "boolean"
  ) {
    return false;
  }

  if (
    typeof result.status !== "string" ||
    !Object.values(SOURCE_STATUSES).includes(
      result.status
    )
  ) {
    return false;
  }

  if (
    !result.source ||
    typeof result.source !== "object"
  ) {
    return false;
  }

  if (
    !Array.isArray(result.errors) ||
    !Array.isArray(result.warnings) ||
    !Array.isArray(result.evidence)
  ) {
    return false;
  }

  return true;
}


/**
 * Validates a source adapter definition.
 *
 * Required:
 *
 * - name
 * - type
 * - fetch()
 */
export function isValidSourceAdapter(
  adapter
) {
  if (
    !adapter ||
    typeof adapter !== "object"
  ) {
    return false;
  }

  if (
    typeof adapter.name !== "string" ||
    !adapter.name.trim()
  ) {
    return false;
  }

  if (
    typeof adapter.type !== "string" ||
    !SOURCE_TYPES.includes(adapter.type)
  ) {
    return false;
  }

  if (
    typeof adapter.fetch !== "function"
  ) {
    return false;
  }

  return true;
}


/**
 * Executes a source adapter safely.
 *
 * Every source should be executed through
 * this wrapper.
 *
 * This guarantees:
 *
 * - adapter validation
 * - exception protection
 * - standardized SourceResult
 * - execution timing
 * - source metadata normalization
 */
export async function executeSourceAdapter(
  adapter,
  input = {},
  context = {}
) {
  const startedAt =
    Date.now();


  /**
   * Validate adapter.
   */
  if (!isValidSourceAdapter(adapter)) {
    return createSourceResult({
      success: false,

      status: SOURCE_STATUSES.FAILED,

      errors: [
        createSourceError(
          "Invalid source adapter.",
          {
            code: "INVALID_SOURCE_ADAPTER"
          }
        )
      ],

      metadata: {
        fetchedAt:
          new Date().toISOString(),

        durationMs:
          Date.now() - startedAt,

        confidence: 0
      }
    });
  }


  try {
    /**
     * Execute adapter.
     */
    const result =
      await adapter.fetch(
        input,
        context
      );


    if (
      !result ||
      typeof result !== "object"
    ) {
      throw new Error(
        "Source adapter returned an invalid result."
      );
    }


    /**
     * Normalize errors/warnings/evidence.
     *
     * Prevent malformed adapters from
     * breaking the pipeline.
     */
    const normalizedResult =
      createSourceResult({
        ...result,

        source: {
          name:
            result.source?.name ||
            adapter.name,

          type:
            result.source?.type ||
            adapter.type,

          url:
            result.source?.url ||
            adapter.url ||
            null
        },

        metadata: {
          fetchedAt:
            result.metadata?.fetchedAt ||
            new Date().toISOString(),

          durationMs:
            Date.now() - startedAt,

          confidence:
            typeof result.metadata?.confidence === "number"
              ? result.metadata.confidence
              : 0
        },

        errors:
          Array.isArray(result.errors)
            ? result.errors
            : [],

        warnings:
          Array.isArray(result.warnings)
            ? result.warnings
            : [],

        evidence:
          Array.isArray(result.evidence)
            ? result.evidence
            : []
      });


    /**
     * Ensure status is valid.
     */
    if (
      !Object.values(SOURCE_STATUSES).includes(
        normalizedResult.status
      )
    ) {
      normalizedResult.status =
        normalizedResult.success
          ? SOURCE_STATUSES.SUCCESS
          : SOURCE_STATUSES.FAILED;
    }


    /**
     * Successful source must contain data.
     */
    if (
      normalizedResult.success &&
      (
        !normalizedResult.data ||
        typeof normalizedResult.data !== "object"
      )
    ) {
      normalizedResult.success = false;

      normalizedResult.status =
        SOURCE_STATUSES.FAILED;

      normalizedResult.errors.push(
        createSourceError(
          "Source adapter succeeded but returned no data.",
          {
            code: "EMPTY_SOURCE_DATA"
          }
        )
      );
    }


    /**
     * Partial status must not be treated
     * as automatic failure.
     *
     * Future multi-source imports may use
     * PARTIAL when some fields are available
     * but others could not be extracted.
     */
    if (
      normalizedResult.status ===
      SOURCE_STATUSES.PARTIAL
    ) {
      normalizedResult.success = true;
    }


    return normalizedResult;

  } catch (error) {
    return createSourceResult({
      success: false,

      status: SOURCE_STATUSES.FAILED,

      source: {
        name: adapter.name,

        type: adapter.type,

        url:
          adapter.url ||
          null
      },

      metadata: {
        fetchedAt:
          new Date().toISOString(),

        durationMs:
          Date.now() - startedAt,

        confidence: 0
      },

      errors: [
        createSourceError(
          error.message ||
          "Unknown source adapter error.",
          {
            code:
              "SOURCE_EXECUTION_FAILED",

            cause: {
              name:
                error.name ||
                "Error",

              message:
                error.message ||
                String(error)
            }
          }
        )
      ]
    });
  }
}


/**
 * Creates a source adapter definition.
 *
 * @param {object} config
 *
 * @returns {object}
 */
export function createSourceAdapter(
  config = {}
) {
  const adapter = {
    name:
      config.name ||
      "Unnamed Source",

    type:
      config.type ||
      "other",

    url:
      config.url ||
      null,

    priority:
      typeof config.priority === "number"
        ? config.priority
        : 0,

    enabled:
      config.enabled !== false,

    fetch:
      config.fetch
  };


  if (!isValidSourceAdapter(adapter)) {
    throw new Error(
      `Invalid source adapter configuration: ${adapter.name}`
    );
  }


  return Object.freeze(adapter);
}