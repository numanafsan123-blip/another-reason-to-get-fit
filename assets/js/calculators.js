/**
 * Another Reason to Get Fit - Calculators Engine
 * Client-side mathematical models for Calorie Needs (Mifflin-St Jeor)
 * and Body Fat % / Lean Body Mass (US Navy Circumference Method).
 * 
 * Zero external dependencies. Zero server transmission. 100% private.
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. Calorie Needs & TDEE Calculator
  // =========================================================================
  const calorieForm = document.getElementById("calorieForm");
  const calorieResults = document.getElementById("calorieResults");

  if (calorieForm && calorieResults) {
    calorieForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const gender = calorieForm.elements["gender"].value;
      const age = parseFloat(document.getElementById("calAge").value);
      const height = parseFloat(document.getElementById("calHeight").value);
      const weight = parseFloat(document.getElementById("calWeight").value);
      const activity = parseFloat(document.getElementById("calActivity").value);
      const goal = calorieForm.elements["goal"].value;

      // Validation
      let isValid = true;
      if (isNaN(age) || age < 15 || age > 85) {
        showInputError("calAge", "Please enter a realistic age between 15 and 85.");
        isValid = false;
      } else {
        clearInputError("calAge");
      }

      if (isNaN(height) || height < 120 || height > 230) {
        showInputError("calHeight", "Please enter height between 120 cm and 230 cm.");
        isValid = false;
      } else {
        clearInputError("calHeight");
      }

      if (isNaN(weight) || weight < 35 || weight > 200) {
        showInputError("calWeight", "Please enter weight between 35 kg and 200 kg.");
        isValid = false;
      } else {
        clearInputError("calWeight");
      }

      if (!isValid) return;

      // Mifflin-St Jeor Formula
      // Men: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
      // Women: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const tdee = Math.round(bmr * activity);
      let targetCalories = tdee;

      if (goal === "fat_loss") {
        targetCalories = Math.round(tdee - 400);
      } else if (goal === "muscle_gain") {
        targetCalories = Math.round(tdee + 300);
      }

      // Macronutrient Estimation (Educational standard)
      // Protein: 2.0g per kg bodyweight
      // Fat: 25% of total target calories
      // Carbohydrates: Balance of calories
      const proteinGrams = Math.round(weight * 2.0);
      const proteinCals = proteinGrams * 4;
      const fatCals = Math.round(targetCalories * 0.25);
      const fatGrams = Math.round(fatCals / 9);
      const carbCals = Math.max(0, targetCalories - (proteinCals + fatCals));
      const carbGrams = Math.round(carbCals / 4);

      // Render Outputs
      document.getElementById("resBMR").textContent = `${Math.round(bmr)} kcal`;
      document.getElementById("resTDEE").textContent = `${tdee} kcal`;
      document.getElementById("resTarget").textContent = `${targetCalories} kcal`;
      document.getElementById("resProtein").textContent = `${proteinGrams}g`;
      document.getElementById("resCarbs").textContent = `${carbGrams}g`;
      document.getElementById("resFats").textContent = `${fatGrams}g`;

      calorieResults.style.display = "block";
      calorieResults.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Dispatch GA4 Event
      if (typeof trackEvent === "function") {
        trackEvent("calorie_calculated", {
          goal_type: goal,
          activity_level: activity,
          gender: gender
        });
      }
    });
  }

  // =========================================================================
  // 2. Body Fat % & Lean Body Mass Calculator (US Navy Method)
  // =========================================================================
  const bodyFatForm = document.getElementById("bodyFatForm");
  const bodyFatResults = document.getElementById("bodyFatResults");
  const femaleHipGroup = document.getElementById("femaleHipGroup");
  const genderRadios = document.querySelectorAll('input[name="bfGender"]');

  if (femaleHipGroup && genderRadios.length > 0) {
    genderRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        if (e.target.value === "female") {
          femaleHipGroup.style.display = "block";
          document.getElementById("bfHip").setAttribute("required", "required");
        } else {
          femaleHipGroup.style.display = "none";
          document.getElementById("bfHip").removeAttribute("required");
        }
      });
    });
  }

  if (bodyFatForm && bodyFatResults) {
    bodyFatForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const gender = bodyFatForm.elements["bfGender"].value;
      const height = parseFloat(document.getElementById("bfHeight").value);
      const weight = parseFloat(document.getElementById("bfWeight").value);
      const neck = parseFloat(document.getElementById("bfNeck").value);
      const waist = parseFloat(document.getElementById("bfWaist").value);
      const hipInput = document.getElementById("bfHip");
      const hip = hipInput ? parseFloat(hipInput.value) : 0;

      let isValid = true;

      if (isNaN(height) || height < 120 || height > 230) {
        showInputError("bfHeight", "Please enter height between 120 cm and 230 cm.");
        isValid = false;
      } else {
        clearInputError("bfHeight");
      }

      if (isNaN(weight) || weight < 35 || weight > 200) {
        showInputError("bfWeight", "Please enter weight between 35 kg and 200 kg.");
        isValid = false;
      } else {
        clearInputError("bfWeight");
      }

      if (isNaN(neck) || neck < 20 || neck > 60) {
        showInputError("bfNeck", "Please enter neck circumference between 20 cm and 60 cm.");
        isValid = false;
      } else {
        clearInputError("bfNeck");
      }

      if (isNaN(waist) || waist < 45 || waist > 160) {
        showInputError("bfWaist", "Please enter waist circumference between 45 cm and 160 cm.");
        isValid = false;
      } else {
        clearInputError("bfWaist");
      }

      if (gender === "male" && waist <= neck) {
        showInputError("bfWaist", "Waist circumference must be larger than neck circumference.");
        isValid = false;
      }

      if (gender === "female") {
        if (isNaN(hip) || hip < 50 || hip > 170) {
          showInputError("bfHip", "Please enter hip circumference between 50 cm and 170 cm.");
          isValid = false;
        } else {
          clearInputError("bfHip");
        }

        if ((waist + hip) <= neck) {
          showInputError("bfWaist", "Sum of waist and hip must exceed neck circumference.");
          isValid = false;
        }
      }

      if (!isValid) return;

      // US Navy Circumference Method Formula:
      // Men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      // Women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
      let bodyFatPercent = 0;
      if (gender === "male") {
        const logDiff = Math.log10(waist - neck);
        const logHeight = Math.log10(height);
        bodyFatPercent = (495 / (1.0324 - (0.19077 * logDiff) + (0.15456 * logHeight))) - 450;
      } else {
        const logSum = Math.log10(waist + hip - neck);
        const logHeight = Math.log10(height);
        bodyFatPercent = (495 / (1.29579 - (0.35004 * logSum) + (0.22100 * logHeight))) - 450;
      }

      // Bound safety
      bodyFatPercent = Math.max(3, Math.min(55, bodyFatPercent));
      const roundedBF = bodyFatPercent.toFixed(1);

      const fatMassKg = (weight * (bodyFatPercent / 100)).toFixed(1);
      const lbmKg = (weight - parseFloat(fatMassKg)).toFixed(1);

      // Classification Category
      let category = "Fitness";
      if (gender === "male") {
        if (bodyFatPercent < 6) category = "Essential Fat";
        else if (bodyFatPercent <= 13) category = "Athletic";
        else if (bodyFatPercent <= 17) category = "Fitness";
        else if (bodyFatPercent <= 24) category = "Average";
        else category = "Above Average";
      } else {
        if (bodyFatPercent < 14) category = "Essential Fat";
        else if (bodyFatPercent <= 20) category = "Athletic";
        else if (bodyFatPercent <= 24) category = "Fitness";
        else if (bodyFatPercent <= 31) category = "Average";
        else category = "Above Average";
      }

      // Render Outputs
      document.getElementById("resBF").textContent = `${roundedBF}%`;
      document.getElementById("resFatMass").textContent = `${fatMassKg} kg`;
      document.getElementById("resLBM").textContent = `${lbmKg} kg`;
      document.getElementById("resCategory").textContent = category;

      bodyFatResults.style.display = "block";
      bodyFatResults.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Dispatch GA4 Event
      if (typeof trackEvent === "function") {
        trackEvent("body_fat_calculated", {
          gender_category: gender,
          body_fat_bracket: category
        });
      }
    });
  }

  // Error display helpers
  function showInputError(inputId, msg) {
    const el = document.getElementById(inputId);
    if (!el) return;
    const parent = el.closest(".form-group");
    if (!parent) return;
    let err = parent.querySelector(".form-error");
    if (err) {
      err.textContent = msg;
      err.style.display = "block";
    }
    el.style.borderColor = "var(--danger)";
  }

  function clearInputError(inputId) {
    const el = document.getElementById(inputId);
    if (!el) return;
    const parent = el.closest(".form-group");
    if (!parent) return;
    let err = parent.querySelector(".form-error");
    if (err) {
      err.style.display = "none";
    }
    el.style.borderColor = "var(--border-color)";
  }
});
