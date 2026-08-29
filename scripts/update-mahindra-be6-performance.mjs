import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/*
=========================================================
EVINSIGHTS
MAHINDRA BE 6 - VERIFIED PERFORMANCE DATA UPDATE
=========================================================

Vehicle:
  Mahindra BE 6

Battery configuration:
  79 kWh

Verified values:

  0-100 km/h:
    6.7 seconds
    Source: Mahindra

  Top speed:
    202 km/h
    Source: Mahindra

  DC fast charging:
    180 kW
    20-80% in 20 minutes
    Source: Mahindra

  Efficiency:
    5.68 km/kWh real-world combined
    = 17.61 kWh/100 km
    Source: Autocar India road test

IMPORTANT:
  Efficiency is a real-world tested value.
  It is NOT represented as an official Mahindra
  certified efficiency figure.
=========================================================
*/

const VEHICLE_ID = "mahindra-be-6";

const now = new Date();

/* =======================================================
   VERIFIED VALUES
======================================================= */

const VERIFIED = {
  acceleration: 6.7,

  topSpeed: 202,

  dcChargingPower: 180,

  dcChargingTime: "20 min",

  dcChargingSoc: "20-80%",

  realWorldEfficiencyKmPerKwh: 5.68,

  efficiencyKwhPer100Km: Number(
    (100 / 5.68).toFixed(2)
  ),
};

/* =======================================================
   SOURCE INFORMATION
======================================================= */

const SOURCES = {
  mahindra: {
    name: "Mahindra",
    url: "https://www.mahindraelectricsuv.com/",
  },

  mahindraBrochure:
    "https://www.mahindraelectricsuv.com/on/demandware.static/-/Library-Sites-eSUVSharedLibrary/default/dwc0822cf3/Be-6e/BE-6-Brochure.pdf",

  autocar:
    "https://www.autocarindia.com/car-reviews-amp/mahindra-be-6-road-test-review-437526",
};

/* =======================================================
   MAIN
======================================================= */

async function main() {
  const client = await pool.connect();

  try {
    console.log("=================================================");
    console.log("🚗 EVINSIGHTS - UPDATE MAHINDRA BE 6");
    console.log("=================================================\n");

    console.log("Vehicle ID:", VEHICLE_ID);

    console.log("\n📊 VERIFIED VALUES");
    console.log("-----------------------------------------------");

    console.log(
      `0-100 km/h        : ${VERIFIED.acceleration} s`
    );

    console.log(
      `Top Speed         : ${VERIFIED.topSpeed} km/h`
    );

    console.log(
      `DC Fast Charging  : ${VERIFIED.dcChargingPower} kW`
    );

    console.log(
      `DC Charging Time  : ${VERIFIED.dcChargingTime}`
    );

    console.log(
      `Efficiency        : ${VERIFIED.efficiencyKwhPer100Km} kWh/100 km`
    );

    console.log(
      `Real World        : ${VERIFIED.realWorldEfficiencyKmPerKwh} km/kWh`
    );

    await client.query("BEGIN");

    /* ===================================================
       1. CHECK VEHICLE
    =================================================== */

    console.log("\n🔎 Checking vehicle...");

    const vehicleResult = await client.query(
      `
      SELECT
        id,
        name,
        payload,
        extracted
      FROM vehicles
      WHERE id = $1
      FOR UPDATE
      `,
      [VEHICLE_ID]
    );

    if (vehicleResult.rowCount === 0) {
      throw new Error(
        `Vehicle '${VEHICLE_ID}' was not found in vehicles table.`
      );
    }

    console.log(
      `   ✅ Vehicle found: ${vehicleResult.rows[0].name}`
    );

    /* ===================================================
       2. UPDATE PERFORMANCE SPECIFICATION
    =================================================== */

    console.log(
      "\n⚙️ Updating performance specification..."
    );

    const performanceData = {
      motorPower: "210 kW",
      motorType:
        "Permanent Magnet Synchronous",
      maxPower: "282 bhp",
      maxTorque: "380 Nm",

      transmissionType: "Automatic",
      gearbox: "Single Speed",
      driveType: "RWD",

      acceleration:
        VERIFIED.acceleration,

      accelerationUnit: "seconds",

      accelerationMetric:
        "0-100 km/h",

      topSpeed:
        VERIFIED.topSpeed,

      topSpeedUnit:
        "km/h",

      efficiency:
        VERIFIED.efficiencyKwhPer100Km,

      efficiencyUnit:
        "kWh/100 km",

      realWorldEfficiency:
        VERIFIED.realWorldEfficiencyKmPerKwh,

      realWorldEfficiencyUnit:
        "km/kWh",

      efficiencyType:
        "real-world combined",

      suspensionSteeringBrakes: {
        frontSuspension:
          "MacPherson Strut suspension",

        rearSuspension:
          "Multi-link suspension",

        shockAbsorbers:
          "FDD & MTV-CL tech",

        steeringType:
          "Electric",

        steeringColumn:
          "Tilt & Telescopic",

        turningRadius:
          "5 m",

        frontBrakeType:
          "Disc",

        rearBrakeType:
          "Disc",
      },
    };

    const performancePayload = {
      source: "Mahindra",
      sourceUrl:
        SOURCES.mahindraBrochure,

      secondarySource:
        SOURCES.autocar,

      verifiedAt:
        now.toISOString(),

      verificationNotes: {
        acceleration:
          "Manufacturer claimed 0-100 km/h time.",

        topSpeed:
          "Manufacturer stated top speed.",

        efficiency:
          "Real-world combined efficiency measured by Autocar India."
      },
    };

    const performanceResult =
      await client.query(
        `
        UPDATE specifications
        SET
          data = $1::jsonb,
          payload = $2::jsonb
        WHERE
          id = $3
          AND vehicle_id = $4
          AND type = 'performance'
        RETURNING id, type
        `,
        [
          JSON.stringify(
            performanceData
          ),

          JSON.stringify(
            performancePayload
          ),

          `spec-${VEHICLE_ID}-performance`,

          VEHICLE_ID,
        ]
      );

    if (
      performanceResult.rowCount === 0
    ) {
      console.log(
        "   ⚠️ Existing performance specification not found."
      );

      console.log(
        "   ➕ Creating performance specification..."
      );

      await client.query(
        `
        INSERT INTO specifications (
          id,
          vehicle_id,
          type,
          data,
          payload
        )
        VALUES (
          $1,
          $2,
          $3,
          $4::jsonb,
          $5::jsonb
        )
        `,
        [
          `spec-${VEHICLE_ID}-performance`,

          VEHICLE_ID,

          "performance",

          JSON.stringify(
            performanceData
          ),

          JSON.stringify(
            performancePayload
          ),
        ]
      );

      console.log(
        "   ✅ Performance specification created"
      );
    } else {
      console.log(
        "   ✅ Performance specification updated"
      );
    }

    /* ===================================================
       3. UPDATE CHARGING
    =================================================== */

    console.log(
      "\n🔋 Updating charging data..."
    );

    const chargingData = {
      chargingPort:
        "CCS-II",

      chargingTime:
        "20 min",

      chargingTimeType:
        "20-80%",

      dcPowerKw:
        VERIFIED.dcChargingPower,

      dcChargingPower:
        VERIFIED.dcChargingPower,

      dcChargingKw:
        VERIFIED.dcChargingPower,

      dcFastChargingPower:
        VERIFIED.dcChargingPower,

      dcFastChargingKw:
        VERIFIED.dcChargingPower,

      dcPower:
        VERIFIED.dcChargingPower,

      dcChargingTime:
        VERIFIED.dcChargingTime,

      dcChargingTimeMinutes:
        20,

      dcChargingSoc:
        VERIFIED.dcChargingSoc,

      acPowerKw:
        11.2,

      acChargingPower:
        11.2,

      acChargingKw:
        11.2,

      acChargingTime:
        "8 hours",

      fastCharging:
        true,

      fastChargingStandard:
        "DC CCS-II",

      portableCharger:
        "13A up to 3.2 kW",

      wallCharger:
        "7.2 kW / 11.2 kW",
    };

    const chargingPayload = {
      source:
        "Mahindra",

      sourceUrl:
        SOURCES.mahindraBrochure,

      verifiedAt:
        now.toISOString(),

      chargingNote:
        "20-80% DC charging time varies with charger output, ambient temperature, battery temperature and other conditions.",

      dcChargingSource:
        "Mahindra BE 6 brochure",

      dcChargingPowerSource:
        "Mahindra BE 6 brochure",
    };

    const chargingResult =
      await client.query(
        `
        UPDATE charging
        SET
          data = $1::jsonb,
          payload = $2::jsonb
        WHERE
          id = $3
          AND vehicle_id = $4
        RETURNING id
        `,
        [
          JSON.stringify(
            chargingData
          ),

          JSON.stringify(
            chargingPayload
          ),

          `charging-${VEHICLE_ID}`,

          VEHICLE_ID,
        ]
      );

    if (
      chargingResult.rowCount === 0
    ) {
      console.log(
        "   ⚠️ Existing charging record not found."
      );

      console.log(
        "   ➕ Creating charging record..."
      );

      await client.query(
        `
        INSERT INTO charging (
          id,
          vehicle_id,
          data,
          payload
        )
        VALUES (
          $1,
          $2,
          $3::jsonb,
          $4::jsonb
        )
        `,
        [
          `charging-${VEHICLE_ID}`,

          VEHICLE_ID,

          JSON.stringify(
            chargingData
          ),

          JSON.stringify(
            chargingPayload
          ),
        ]
      );

      console.log(
        "   ✅ Charging record created"
      );
    } else {
      console.log(
        "   ✅ Charging record updated"
      );
    }

    /* ===================================================
       4. UPDATE VEHICLE EXTRACTED DATA
    =================================================== */

    console.log(
      "\n🚗 Updating vehicle extracted data..."
    );

    await client.query(
      `
      UPDATE vehicles
      SET
        extracted =
          COALESCE(extracted, '{}'::jsonb)
          || $1::jsonb,

        updated_at = $2
      WHERE id = $3
      `,
      [
        JSON.stringify({
          acceleration:
            VERIFIED.acceleration,

          zeroTo100:
            VERIFIED.acceleration,

          topSpeed:
            VERIFIED.topSpeed,

          efficiency:
            VERIFIED.efficiencyKwhPer100Km,

          efficiencyKwhPer100Km:
            VERIFIED.efficiencyKwhPer100Km,

          realWorldEfficiency:
            VERIFIED.realWorldEfficiencyKmPerKwh,

          realWorldEfficiencyKmPerKwh:
            VERIFIED.realWorldEfficiencyKmPerKwh,

          dcChargingPower:
            VERIFIED.dcChargingPower,

          dcChargingKw:
            VERIFIED.dcChargingPower,

          dcFastChargingPower:
            VERIFIED.dcChargingPower,

          charging: {
            dcPowerKw:
              VERIFIED.dcChargingPower,

            dcChargingPower:
              VERIFIED.dcChargingPower,

            dcChargingKw:
              VERIFIED.dcChargingPower,

            dcFastChargingPower:
              VERIFIED.dcChargingPower,

            dcFastChargingKw:
              VERIFIED.dcChargingPower,

            chargingTime:
              VERIFIED.dcChargingTime,

            chargingTimeMinutes:
              20,

            connector:
              "CCS-II",
          },

          performance: {
            acceleration:
              VERIFIED.acceleration,

            zeroTo100:
              VERIFIED.acceleration,

            topSpeed:
              VERIFIED.topSpeed,

            efficiency:
              VERIFIED.efficiencyKwhPer100Km,

            efficiencyKwhPer100Km:
              VERIFIED.efficiencyKwhPer100Km,
          },

          verifiedData: {
            acceleration:
              VERIFIED.acceleration,

            topSpeed:
              VERIFIED.topSpeed,

            dcChargingPower:
              VERIFIED.dcChargingPower,

            efficiencyKwhPer100Km:
              VERIFIED.efficiencyKwhPer100Km,

            efficiencyKmPerKwh:
              VERIFIED.realWorldEfficiencyKmPerKwh,

            verifiedAt:
              now.toISOString(),
          },
        }),

        now,

        VEHICLE_ID,
      ]
    );

    console.log(
      "   ✅ Vehicle extracted data updated"
    );

    /* ===================================================
       5. UPDATE VEHICLE PAYLOAD
    =================================================== */

    console.log(
      "\n📦 Updating vehicle payload..."
    );

    await client.query(
      `
      UPDATE vehicles
      SET
        payload =
          COALESCE(payload, '{}'::jsonb)
          || $1::jsonb,

        updated_at = $2
      WHERE id = $3
      `,
      [
        JSON.stringify({
          acceleration:
            VERIFIED.acceleration,

          zeroTo100:
            VERIFIED.acceleration,

          topSpeed:
            VERIFIED.topSpeed,

          efficiency:
            VERIFIED.efficiencyKwhPer100Km,

          efficiencyKwhPer100Km:
            VERIFIED.efficiencyKwhPer100Km,

          realWorldEfficiency:
            VERIFIED.realWorldEfficiencyKmPerKwh,

          realWorldEfficiencyKmPerKwh:
            VERIFIED.realWorldEfficiencyKmPerKwh,

          dcChargingPower:
            VERIFIED.dcChargingPower,

          dcChargingKw:
            VERIFIED.dcChargingPower,

          dcFastChargingPower:
            VERIFIED.dcChargingPower,

          charging: {
            dcPowerKw:
              VERIFIED.dcChargingPower,

            dcChargingPower:
              VERIFIED.dcChargingPower,

            dcChargingKw:
              VERIFIED.dcChargingPower,

            dcFastChargingPower:
              VERIFIED.dcChargingPower,

            dcFastChargingKw:
              VERIFIED.dcChargingPower,

            chargingTime:
              VERIFIED.dcChargingTime,

            chargingTimeMinutes:
              20,

            connector:
              "CCS-II",
          },

          performance: {
            acceleration:
              VERIFIED.acceleration,

            zeroTo100:
              VERIFIED.acceleration,

            topSpeed:
              VERIFIED.topSpeed,

            efficiency:
              VERIFIED.efficiencyKwhPer100Km,

            efficiencyKwhPer100Km:
              VERIFIED.efficiencyKwhPer100Km,
          },
        }),

        now,

        VEHICLE_ID,
      ]
    );

    console.log(
      "   ✅ Vehicle payload updated"
    );

    /* ===================================================
       6. UPDATE VERIFICATION METADATA
    =================================================== */

    console.log(
      "\n🔎 Updating verification metadata..."
    );

    await client.query(
      `
      UPDATE vehicles
      SET
        verification =
          COALESCE(
            verification,
            '{}'::jsonb
          )
          || $1::jsonb,

        updated_at = $2
      WHERE id = $3
      `,
      [
        JSON.stringify({
          source:
            "Mahindra",

          verified:
            true,

          verifiedAt:
            now.toISOString(),

          performanceSource:
            SOURCES.mahindraBrochure,

          efficiencySource:
            SOURCES.autocar,

          fields: {
            acceleration: {
              value:
                VERIFIED.acceleration,

              unit:
                "seconds",

              source:
                "Mahindra",
            },

            topSpeed: {
              value:
                VERIFIED.topSpeed,

              unit:
                "km/h",

              source:
                "Mahindra",
            },

            dcChargingPower: {
              value:
                VERIFIED.dcChargingPower,

              unit:
                "kW",

              source:
                "Mahindra",
            },

            efficiency: {
              value:
                VERIFIED.efficiencyKwhPer100Km,

              unit:
                "kWh/100 km",

              source:
                "Autocar India",

              type:
                "real-world combined",

              baseValue:
                VERIFIED.realWorldEfficiencyKmPerKwh,

              baseUnit:
                "km/kWh",
            },
          },
        }),

        now,

        VEHICLE_ID,
      ]
    );

    console.log(
      "   ✅ Verification metadata updated"
    );

    /* ===================================================
       7. VERIFY DATABASE
    =================================================== */

    console.log(
      "\n🔍 Verifying final database values..."
    );

    const verifyVehicle =
      await client.query(
        `
        SELECT
          id,
          name,
          extracted,
          payload,
          verification,
          updated_at
        FROM vehicles
        WHERE id = $1
        `,
        [VEHICLE_ID]
      );

    const verifyPerformance =
      await client.query(
        `
        SELECT
          id,
          type,
          data,
          payload
        FROM specifications
        WHERE
          vehicle_id = $1
          AND type = 'performance'
        `,
        [VEHICLE_ID]
      );

    const verifyCharging =
      await client.query(
        `
        SELECT
          id,
          data,
          payload
        FROM charging
        WHERE vehicle_id = $1
        `,
        [VEHICLE_ID]
      );

    /* ===================================================
       8. COMMIT
    =================================================== */

    await client.query("COMMIT");

    console.log(
      "\n================================================="
    );

    console.log(
      "🎉 MAHINDRA BE 6 UPDATE COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      `Vehicle              : Mahindra BE 6`
    );

    console.log(
      `0-100 km/h            : ${VERIFIED.acceleration} s`
    );

    console.log(
      `Top Speed             : ${VERIFIED.topSpeed} km/h`
    );

    console.log(
      `DC Fast Charging      : ${VERIFIED.dcChargingPower} kW`
    );

    console.log(
      `DC Charging Time      : ${VERIFIED.dcChargingTime}`
    );

    console.log(
      `Efficiency            : ${VERIFIED.efficiencyKwhPer100Km} kWh/100 km`
    );

    console.log(
      `Real World Efficiency : ${VERIFIED.realWorldEfficiencyKmPerKwh} km/kWh`
    );

    console.log(
      "\nDatabase verification:"
    );

    console.log(
      `   Vehicle rows       : ${verifyVehicle.rowCount}`
    );

    console.log(
      `   Performance rows   : ${verifyPerformance.rowCount}`
    );

    console.log(
      `   Charging rows      : ${verifyCharging.rowCount}`
    );

    console.log(
      "\nSources:"
    );

    console.log(
      `   Mahindra brochure  : ${SOURCES.mahindraBrochure}`
    );

    console.log(
      `   Autocar efficiency : ${SOURCES.autocar}`
    );

    console.log(
      "\n✅ Transaction committed successfully."
    );

    console.log(
      "================================================="
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "\n❌ BE 6 UPDATE FAILED"
    );

    console.error(
      "Transaction rolled back."
    );

    console.error(error);

    console.error(
      "\n⚠️ No partial update was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();