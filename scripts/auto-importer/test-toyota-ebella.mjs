/**
 * EVInsights Auto Importer
 * End-to-End Pipeline Test
 *
 * Vehicle:
 * Toyota Urban Cruiser EBELLA
 *
 * Flow:
 *
 * Fixture
 *   ↓
 * Source
 *   ↓
 * Transformer
 *   ↓
 * CanonicalVehicle
 *   ↓
 * Validation
 *   ↓
 * Safety Check
 *   ↓
 * Preview
 *   ↓
 * Pipeline Summary
 *
 * IMPORTANT:
 * This is a DRY RUN.
 *
 * No database operations:
 * - No INSERT
 * - No UPDATE
 * - No DELETE
 */

import toyotaUrbanCruiserEbella from
  "./fixtures/toyota-urban-cruiser-ebella.mjs";

import {
  executeVehicleImport
} from "./run.mjs";


console.log("\n");

console.log("############################################################");
console.log("#                                                          #");
console.log("#        TOYOTA URBAN CRUISER EBELLA PIPELINE TEST         #");
console.log("#                                                          #");
console.log("############################################################");


/**
 * Run the complete Auto Importer pipeline.
 */
const result =
  await executeVehicleImport(
    toyotaUrbanCruiserEbella,
    {
      /**
       * Show full terminal preview.
       */
      printPreview: true,


      /**
       * Do not crash immediately.
       *
       * Pipeline errors will be returned
       * inside the result object.
       */
      throwOnError: false
    }
);


/**
 * Final test result.
 */
console.log("\n");
console.log("============================================================");
console.log("                    TEST RESULT");
console.log("============================================================");


if (result.success) {
  console.log("\nSTATUS: PASS");

  console.log(
    "\nThe Auto Importer pipeline completed successfully."
  );

  console.log(
    "\nDatabase was NOT modified."
  );

  process.exitCode = 0;

} else {
  console.log("\nSTATUS: FAILED");

  console.log(
    `\nFailed Stage: ${result.stage || "unknown"}`
  );


  /**
   * Print source errors.
   */
  if (
    result.source?.errors?.length > 0
  ) {
    console.log("\nSOURCE ERRORS:");

    for (
      const error of result.source.errors
    ) {
      console.log(
        `- ${error.message}`
      );
    }
  }


  /**
   * Print pipeline errors.
   */
  if (
    result.pipeline?.errors?.length > 0
  ) {
    console.log("\nPIPELINE ERRORS:");

    for (
      const error of result.pipeline.errors
    ) {
      console.log(
        `- ${error.message}`
      );
    }
  }


  /**
   * Print validation errors.
   */
  if (
    result.pipeline?.validation?.errors?.length > 0
  ) {
    console.log("\nVALIDATION ERRORS:");

    for (
      const error of result.pipeline.validation.errors
    ) {
      console.log(
        `- [${error.field || "unknown"}] ${error.message}`
      );
    }
  }


  process.exitCode = 1;
}


console.log("\n============================================================");
console.log("              TOYOTA EBELLA TEST FINISHED");
console.log("============================================================\n");