<template>
  <div class="flex min-h-screen bg-gray-50 font-sans">
    <div
      class="hidden lg:flex lg:w-1/2 bg-slate-900 justify-center items-center p-12 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-slate-900 opacity-90"
      ></div>
      <div class="relative z-10 text-white text-center">
        <h1 class="text-5xl font-bold mb-6 tracking-tight">Harbour.Space</h1>
        <p class="text-lg text-indigo-200 max-w-md mx-auto">
          Empowering the next generation of digital creators, innovators, and
          tech leaders.
        </p>
      </div>
    </div>

    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 bg-white"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p class="text-sm text-gray-600 mb-8">
            Please enter your details to sign in.
          </p>
        </div>

        <div class="mt-8">
          <form action="#" method="POST" class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="student@harbour.space"
                />
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-8 text-center text-sm text-gray-600">
            Don't have an account?
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// You can add your reactive variables (refs) and login functions here later!
</script>

<style scoped>
/* Tailwind handles the styling, but you can add custom component-specific CSS here if needed */
</style>
