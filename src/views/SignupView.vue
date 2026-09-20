<script setup>
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false
});

const isLoading = ref(false);
const error = ref(null);
const successMessage = ref(null);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

/* =========================================
   Validation
========================================= */

const nameError = computed(() => {
  const name = form.value.name.trim();

  if (!name) {
    return "Name is required.";
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (name.length > 60) {
    return "Name must not exceed 60 characters.";
  }

  return "";
});

const emailError = computed(() => {
  if (!form.value.email.trim()) {
    return "Email is required.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(form.value.email)) {
    return "Please enter a valid email address.";
  }

  return "";
});

const passwordError = computed(() => {
  const password = form.value.password;

  if (!password) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return "";
});

const confirmPasswordError = computed(() => {
  if (!form.value.confirmPassword) {
    return "Please confirm your password.";
  }

  if (
    form.value.confirmPassword !==
    form.value.password
  ) {
    return "Passwords do not match.";
  }

  return "";
});

const agreeError = computed(() => {
  return form.value.agree
    ? ""
    : "You must agree to continue.";
});

const formIsValid = computed(() => {
  return (
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !agreeError.value
  );
});

/* =========================================
   Password Strength
========================================= */

const passwordStrength = computed(() => {
  const password = form.value.password;

  if (!password) {
    return {
      label: "",
      level: 0
    };
  }

  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      label: "Weak",
      level: 1
    };
  }

  if (score <= 3) {
    return {
      label: "Fair",
      level: 2
    };
  }

  if (score <= 4) {
    return {
      label: "Good",
      level: 3
    };
  }

  return {
    label: "Strong",
    level: 4
  };
});

/* =========================================
   Submit
========================================= */

async function signup() {
  error.value = null;
  successMessage.value = null;

  if (!formIsValid.value) {
    error.value = "Please fix the errors before creating your account.";
    return;
  }

  isLoading.value = true;

  try {
    /*
      Later connect this to your Pinia auth store:

      await authStore.signup({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      });
    */

    await new Promise((resolve) => setTimeout(resolve, 900));

    successMessage.value =
      "Your account has been created successfully.";

    setTimeout(() => {
      router.push("/login");
    }, 700);

  } catch (err) {
    console.error(err);

    error.value =
      err?.message ||
      "Unable to create your account. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="auth-page">

    <div class="decor-circle circle-one"></div>
    <div class="decor-circle circle-two"></div>

    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100 py-5">

        <div class="col-12 col-sm-10 col-md-8 col-lg-5">

          <!-- Brand -->
          <div class="text-center mb-4">

            <RouterLink
              to="/"
              class="brand-link"
            >
              <span class="brand-icon">B</span>
              <span>BookStore</span>
            </RouterLink>

            <p class="brand-subtitle mt-3 mb-0">
              Start your literary journey.
            </p>

          </div>

          <!-- Signup Card -->
          <div class="auth-card">

            <div class="text-center mb-4">

              <div class="eyebrow">
                Join Our Community
              </div>

              <h1 class="auth-title">
                Create your account
              </h1>

              <p class="auth-description">
                Build your personal connection to the world of books.
              </p>

            </div>

            <!-- Error -->
            <div
              v-if="error"
              class="alert-custom alert-error mb-4"
            >

              <span class="alert-icon">
                !
              </span>

              <div>
                <strong>Something went wrong</strong>

                <div class="small mt-1">
                  {{ error }}
                </div>
              </div>

            </div>

            <!-- Success -->
            <div
              v-if="successMessage"
              class="alert-custom alert-success mb-4"
            >

              <span class="alert-icon">
                ✓
              </span>

              <div>
                <strong>Account created</strong>

                <div class="small mt-1">
                  {{ successMessage }}
                </div>
              </div>

            </div>

            <form @submit.prevent="signup">

              <!-- Name -->
              <div class="mb-3">

                <label
                  for="name"
                  class="form-label"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-control auth-input"
                  :class="{
                    'input-error': nameError
                  }"
                  placeholder="e.g. Ahmed Weir"
                  maxlength="60"
                  autocomplete="name"
                  :disabled="isLoading"
                />

                <div
                  v-if="nameError"
                  class="validation-message"
                >
                  {{ nameError }}
                </div>

              </div>

              <!-- Email -->
              <div class="mb-3">

                <label
                  for="email"
                  class="form-label"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-control auth-input"
                  :class="{
                    'input-error': emailError
                  }"
                  placeholder="you@example.com"
                  autocomplete="email"
                  :disabled="isLoading"
                />

                <div
                  v-if="emailError"
                  class="validation-message"
                >
                  {{ emailError }}
                </div>

              </div>

              <!-- Password -->
              <div class="mb-3">

                <label
                  for="password"
                  class="form-label"
                >
                  Password
                </label>

                <div class="password-wrapper">

                  <input
                    id="password"
                    v-model="form.password"
                    :type="
                      showPassword
                        ? 'text'
                        : 'password'
                    "
                    class="form-control auth-input password-input"
                    :class="{
                      'input-error': passwordError
                    }"
                    placeholder="Create a password"
                    autocomplete="new-password"
                    :disabled="isLoading"
                  />

                  <button
                    type="button"
                    class="password-toggle"
                    @click="
                      showPassword = !showPassword
                    "
                  >
                    {{
                      showPassword
                        ? "Hide"
                        : "Show"
                    }}
                  </button>

                </div>

                <!-- Strength -->
                <div
                  v-if="form.password"
                  class="password-strength"
                >

                  <div class="strength-bars">

                    <span
                      v-for="level in 4"
                      :key="level"
                      :class="{
                        active:
                          level <=
                          passwordStrength.level
                      }"
                    ></span>

                  </div>

                  <span
                    class="strength-label"
                  >
                    {{ passwordStrength.label }}
                  </span>

                </div>

                <div
                  v-if="passwordError"
                  class="validation-message"
                >
                  {{ passwordError }}
                </div>

              </div>

              <!-- Confirm Password -->
              <div class="mb-4">

                <label
                  for="confirmPassword"
                  class="form-label"
                >
                  Confirm Password
                </label>

                <div class="password-wrapper">

                  <input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    :type="
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    "
                    class="form-control auth-input password-input"
                    :class="{
                      'input-error':
                        confirmPasswordError
                    }"
                    placeholder="Repeat your password"
                    autocomplete="new-password"
                    :disabled="isLoading"
                  />

                  <button
                    type="button"
                    class="password-toggle"
                    @click="
                      showConfirmPassword =
                        !showConfirmPassword
                    "
                  >
                    {{
                      showConfirmPassword
                        ? "Hide"
                        : "Show"
                    }}
                  </button>

                </div>

                <div
                  v-if="confirmPasswordError"
                  class="validation-message"
                >
                  {{ confirmPasswordError }}
                </div>

              </div>

              <!-- Terms -->
              <div class="mb-4">

                <div class="form-check">

                  <input
                    id="agree"
                    v-model="form.agree"
                    type="checkbox"
                    class="form-check-input custom-check"
                    :disabled="isLoading"
                  />

                  <label
                    for="agree"
                    class="form-check-label"
                  >
                    I agree to the
                    <RouterLink
                      to="/terms"
                      class="terms-link"
                    >
                      Terms of Service
                    </RouterLink>
                    and
                    <RouterLink
                      to="/privacy"
                      class="terms-link"
                    >
                      Privacy Policy
                    </RouterLink>
                  </label>

                </div>

                <div
                  v-if="agreeError"
                  class="validation-message"
                >
                  {{ agreeError }}
                </div>

              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="btn auth-submit w-100"
                :disabled="
                  isLoading ||
                  !formIsValid
                "
              >

                <span
                  v-if="isLoading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>

                {{
                  isLoading
                    ? "Creating Account..."
                    : "Create Account"
                }}

              </button>

            </form>

            <!-- Divider -->
            <div class="divider">
              <span>or</span>
            </div>

            <!-- Login -->
            <div class="text-center register-text">

              Already have an account?

              <RouterLink
                to="/login"
                class="register-link"
              >
                Sign in
              </RouterLink>

            </div>

          </div>

          <!-- Back -->
          <div class="text-center mt-4">

            <RouterLink
              to="/"
              class="back-link"
            >
              ← Back to bookstore
            </RouterLink>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* =========================================
   Page
========================================= */

.auth-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  background: #f8f4ed;
  color: #202020;
}

/* =========================================
   Background
========================================= */

.decor-circle {
  position: absolute;

  border-radius: 50%;

  pointer-events: none;
}

.circle-one {
  width: 320px;
  height: 320px;

  top: -130px;
  left: -120px;

  background: #eee3d5;
}

.circle-two {
  width: 400px;
  height: 400px;

  right: -180px;
  bottom: -180px;

  background: #f0e6d9;
}

/* =========================================
   Brand
========================================= */

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  text-decoration: none;

  color: #2b2118;

  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: 700;
}

.brand-icon {
  width: 38px;
  height: 38px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #8b5e34;
  color: #fff;

  font-size: 21px;
}

.brand-subtitle {
  color: #8a8178;
  font-size: 13px;
}

/* =========================================
   Card
========================================= */

.auth-card {
  position: relative;
  z-index: 1;

  padding: 34px;

  background: #fff;

  border: 1px solid #e9e2d8;
  border-radius: 20px;

  box-shadow:
    0 20px 50px rgba(72, 48, 28, 0.1);
}

/* =========================================
   Heading
========================================= */

.eyebrow {
  margin-bottom: 8px;

  color: #8b5e34;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.auth-title {
  margin-bottom: 8px;

  font-family: "Playfair Display", serif;
  font-size: 30px;
  font-weight: 700;

  color: #202020;
}

.auth-description {
  margin: 0;

  color: #817970;
  font-size: 14px;
  line-height: 1.6;
}

/* =========================================
   Inputs
========================================= */

.form-label {
  margin-bottom: 8px;

  color: #302820;

  font-size: 14px;
  font-weight: 600;
}

.auth-input {
  min-height: 46px;

  padding: 11px 13px;

  border: 1px solid #dcd3c8;
  border-radius: 10px;

  background: #fff;

  color: #202020;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.auth-input::placeholder {
  color: #aaa;
}

.auth-input:hover {
  border-color: #cbbca9;
}

.auth-input:focus {
  border-color: #8b5e34;

  box-shadow:
    0 0 0 3px rgba(139, 94, 52, 0.1);

  color: #202020;
}

.input-error {
  border-color: #c75b5b !important;
}

.validation-message {
  margin-top: 6px;

  color: #b84b4b;

  font-size: 12px;
}

/* =========================================
   Password
========================================= */

.password-wrapper {
  position: relative;
}

.password-input {
  padding-right: 65px;
}

.password-toggle {
  position: absolute;

  top: 50%;
  right: 12px;

  transform: translateY(-50%);

  border: 0;
  background: transparent;

  color: #8b5e34;

  font-size: 12px;
  font-weight: 700;
}

.password-toggle:hover {
  color: #65411f;
}

/* =========================================
   Password Strength
========================================= */

.password-strength {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-top: 8px;
}

.strength-bars {
  display: flex;
  gap: 4px;

  flex: 1;
}

.strength-bars span {
  height: 4px;

  flex: 1;

  border-radius: 10px;

  background: #e5ded5;
}

.strength-bars span.active {
  background: #8b5e34;
}

.strength-label {
  min-width: 42px;

  color: #8a8178;

  font-size: 11px;
  font-weight: 600;
}

/* =========================================
   Checkbox / Terms
========================================= */

.custom-check {
  border-color: #cbbca9;
}

.custom-check:checked {
  background-color: #8b5e34;
  border-color: #8b5e34;
}

.form-check-label {
  color: #6f665e;
  font-size: 12px;
  line-height: 1.6;
}

.terms-link {
  color: #8b5e34;
  font-weight: 600;
  text-decoration: none;
}

.terms-link:hover {
  color: #65411f;
  text-decoration: underline;
}

/* =========================================
   Submit
========================================= */

.auth-submit {
  min-height: 46px;

  border-radius: 10px;

  background: #8b5e34;
  border: 1px solid #8b5e34;

  color: #fff;

  font-weight: 700;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.auth-submit:hover:not(:disabled) {
  background: #754d2b;
  border-color: #754d2b;

  transform: translateY(-1px);

  box-shadow:
    0 7px 18px rgba(139, 94, 52, 0.22);
}

.auth-submit:disabled {
  background: #c7b6a4;
  border-color: #c7b6a4;
  cursor: not-allowed;
}

/* =========================================
   Divider
========================================= */

.divider {
  display: flex;
  align-items: center;
  gap: 14px;

  margin: 25px 0;

  color: #aaa;

  font-size: 12px;
}

.divider::before,
.divider::after {
  content: "";

  flex: 1;

  height: 1px;

  background: #eee7de;
}

/* =========================================
   Bottom Links
========================================= */

.register-text {
  color: #817970;
  font-size: 13px;
}

.register-link,
.back-link {
  color: #8b5e34;

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;
}

.register-link {
  margin-left: 4px;
}

.register-link:hover,
.back-link:hover {
  color: #65411f;
  text-decoration: underline;
}

.back-link {
  color: #817970;
}

/* =========================================
   Alerts
========================================= */

.alert-custom {
  display: flex;
  align-items: flex-start;
  gap: 12px;

  padding: 13px;

  border-radius: 11px;

  font-size: 13px;
}

.alert-icon {
  width: 25px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  font-weight: 800;
}

.alert-error {
  background: #fff4f3;
  border: 1px solid #efc9c5;

  color: #8f3d37;
}

.alert-error .alert-icon {
  background: #f1d3cf;
  color: #a5463f;
}

.alert-success {
  background: #f2f8f2;
  border: 1px solid #cfe1cf;

  color: #3e6b43;
}

.alert-success .alert-icon {
  background: #dcebdc;
  color: #3e6b43;
}

/* =========================================
   Mobile
========================================= */

@media (max-width: 576px) {
  .auth-card {
    padding: 24px 20px;
    border-radius: 16px;
  }

  .auth-title {
    font-size: 25px;
  }

  .brand-link {
    font-size: 25px;
  }
}
</style>