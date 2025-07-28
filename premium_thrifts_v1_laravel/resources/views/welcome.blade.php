<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Premium Thrift</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-500">

    <!-- Header -->
    <header class="bg-blue-600 text-white py-5 shadow-md">
        <div class="container mx-auto text-center">
            <h1 class="text-3xl font-bold">🛍️ Premium Thrift</h1>
            <p class="text-sm mt-1">Your one-stop shop for quality products at unbeatable prices!</p>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex items-center justify-center min-h-screen bg-[url(/assets/bg-static.png)] w-full h-full bg-no-repeat bg-center bg-cover ">
        <div class="bg-white p-10 rounded-xl shadow-lg text-center max-w-lg">
            <h2 class="text-4xl font-extrabold text-gray-800">Welcome to Premium Thrift Shop</h2>
            <p class="text-gray-600 mt-3 text-lg">Discover amazing deals on the latest fashion, electronics, and more.</p>

            <!-- Highlights -->
            <div class="mt-6 space-y-3">
                <div class="flex items-center gap-3">
                    <span class="text-green-500 text-2xl">✔️</span>
                    <p class="text-gray-700">High-Quality Products</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-green-500 text-2xl">✔️</span>
                    <p class="text-gray-700">Fast & Secure Checkout</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-green-500 text-2xl">✔️</span>
                    <p class="text-gray-700">Free Shipping on Orders Over $50</p>
                </div>
            </div>

            <!-- Call to Action -->
            <a href="http://127.0.0.1:5173/product"
               class="mt-6 inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Start Shopping 🛒
            </a>

            <!-- Contact Info -->
            <p class="mt-5 text-gray-500 text-sm">Need help? <a href="http://127.0.0.1:5173#" class="text-blue-500 hover:underline">Contact us</a></p>
        </div>
    </main>

    <!-- Footer -->
    <footer class="text-center py-4 text-white text-sm bg-gray-800">
        &copy; {{ date('Y') }} Premium Thrift. All rights reserved.
    </footer>

</body>
</html>
