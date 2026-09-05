// /**
//  * EVInsights Auto Importer
//  * Manual Source
//  *
//  * Used for:
//  *
//  * - Testing the pipeline
//  * - Admin entered vehicle data
//  * - Initial vehicle creation
//  * - Development fixtures
//  *
//  * This source performs NO database operation.
//  */

// import {
//   SOURCE_TYPES,
//   createSourceResult,
//   createSourceError,
//   createSourceWarning
// } from "./source.interface.mjs";


// /**
//  * Creates a manual source adapter.
//  */
// export function createManualSource(
//   initialData = {}
// ) {
//   let data = initialData;


//   return {

//     type: SOURCE_TYPES.MANUAL,

//     name: "Manual Source",


//     /**
//      * Replace source data.
//      */
//     setData(newData = {}) {
//       data = newData;

//       return this;
//     },


//     /**
//      * Get current raw data.
//      */
//     getData() {
//       return data;
//     },


//     /**
//      * Fetch source data.
//      *
//      * Since this is a manual source,
//      * no network request happens.
//      */
//     async fetch() {
//       try {
//         if (
//           !data ||
//           typeof data !== "object"
//         ) {
//           return createSourceResult({
//             success: false,

//             sourceType: SOURCE_TYPES.MANUAL,

//             sourceName: "Manual Source",

//             errors: [
//               createSourceError(
//                 "Manual source data is invalid.",
//                 "INVALID_MANUAL_DATA"
//               )
//             ]
//           });
//         }


//         const warnings = [];


//         /**
//          * Basic warnings.
//          */

//         if (!data.name && !data.vehicleName) {
//           warnings.push(
//             createSourceWarning(
//               "Vehicle name is missing.",
//               "MISSING_VEHICLE_NAME"
//             )
//           );
//         }

//         if (!data.brand && !data.brandName) {
//           warnings.push(
//             createSourceWarning(
//               "Brand name is missing.",
//               "MISSING_BRAND_NAME"
//             )
//           );
//         }


//         return createSourceResult({
//           success: true,

//           sourceType: SOURCE_TYPES.MANUAL,

//           sourceName: "Manual Source",

//           data,

//           sources: data.sources || [],

//           warnings,

//           metadata: {
//             mode: "local",

//             networkRequest: false,

//             databaseAccess: false
//           }
//         });

//       } catch (error) {
//         return createSourceResult({
//           success: false,

//           sourceType: SOURCE_TYPES.MANUAL,

//           sourceName: "Manual Source",

//           errors: [
//             createSourceError(
//               error.message ||
//                 "Manual source failed.",

//               "MANUAL_SOURCE_ERROR"
//             )
//           ]
//         });
//       }
//     }
//   };
// }


// /**
//  * One-time helper.
//  *
//  * Useful when a source object does not
//  * need to be reused.
//  */
// export async function loadManualSource(
//   data = {}
// ) {
//   const source =
//     createManualSource(data);

//   return source.fetch();
// }


/**
 * EVInsights Auto Importer
 * Manual Source Adapter
 *
 * Converts manually supplied vehicle data into
 * the standard SourceResult contract.
 *
 * This adapter is primarily useful for:
 *
 * - Development fixtures
 * - Manual imports
 * - Admin-entered vehicle data
 * - Testing
 *
 * It does NOT:
 *
 * - Fetch data from the web
 * - Connect to the database
 * - Modify existing records
 */

import {
  SOURCE_STATUSES,
  createSourceAdapter,
  createSourceResult,
  createSourceError,
  createSourceWarning
} from "./source.interface.mjs";


/**
 * Manual Source Adapter
 */
const manualSource = createSourceAdapter({
  name: "Manual Source",

  type: "manual",

  priority: 10,

  enabled: true,


  /**
   * Fetch manually supplied data.
   *
   * Since this is a manual adapter,
   * "fetch" means validating and packaging
   * the provided input.
   *
   * @param {object} input
   * @param {object} context
   *
   * @returns {Promise<object>}
   */
  async fetch(
    input = {},
    context = {}
  ) {
    const startedAt =
      Date.now();


    /**
     * Ensure input is an object.
     */
    if (
      !input ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {
      return createSourceResult({
        success: false,

        status: SOURCE_STATUSES.FAILED,

        source: {
          name: "Manual Source",

          type: "manual",

          url: null
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
            "Manual source requires a vehicle data object.",
            {
              code: "INVALID_MANUAL_INPUT"
            }
          )
        ]
      });
    }


    /**
     * Require at least one identity field.
     *
     * Full validation is handled later by
     * the CanonicalVehicle validator.
     */
    const hasIdentity =
      Boolean(
        input.name ||
        input.vehicleName ||
        input.model
      );


    if (!hasIdentity) {
      return createSourceResult({
        success: false,

        status: SOURCE_STATUSES.FAILED,

        source: {
          name:
            input.sourceName ||
            "Manual Source",

          type: "manual",

          url: null
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
            "Manual vehicle data contains no vehicle identity.",
            {
              code: "MISSING_VEHICLE_IDENTITY"
            }
          )
        ]
      });
    }


    /**
     * Non-blocking warnings.
     */
    const warnings = [];


    if (!input.brand && !input.brandName) {
      warnings.push(
        createSourceWarning(
          "Vehicle brand was not provided.",
          {
            code: "MISSING_BRAND"
          }
        )
      );
    }


    /**
     * Confidence.
     *
     * Manual fixtures should not automatically
     * be considered verified.
     */
    const confidence =
      typeof input.confidence === "number"
        ? input.confidence
        : 0;


    /**
     * Return standardized source result.
     */
    return createSourceResult({
      success: true,

      status: SOURCE_STATUSES.SUCCESS,


      source: {
        name:
          input.sourceName ||
          "Manual Source",

        type: "manual",

        url: null
      },


      /**
       * Raw normalized input.
       *
       * Generic transformer will convert this
       * into CanonicalVehicle.
       */
      data: {
        ...input,

        sourceType: "manual",

        sourceName:
          input.sourceName ||
          "Manual Source"
      },


      metadata: {
        fetchedAt:
          new Date().toISOString(),

        durationMs:
          Date.now() - startedAt,

        confidence
      },


      warnings,


      evidence: [
        {
          type: "manual_input",

          sourceName:
            input.sourceName ||
            "Manual Source",

          collectedAt:
            new Date().toISOString(),

          confidence
        }
      ]
    });
  }
});


export default manualSource;

export {
  manualSource
};