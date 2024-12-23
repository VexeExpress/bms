<script setup lang="ts">
</script>
<template>
    <div>
        <header>
            <h1>My App</h1>
        </header>
        <nav>
            <ul>
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
            </ul>
        </nav>
        <main>
            <slot></slot>
        </main>
    </div>
</template>
<style scoped></style>