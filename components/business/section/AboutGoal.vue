<script lang="ts" setup>

</script>

<template>
    <section id="our-goal" class="about-our-goal">
        <div class="container grid md:grid-cols-2 items-center py-20 px-4 mx-auto">
            <div>
                <h2 class="mt-0 text-5xl">Our Goal</h2>
                <p class="text-lg">
                    With the mission of Simlessly: “Seamlessly Empowering Enterprises with SIM less Services”, we drive widespread adoption of eSIM and iSIM.
                    Through a user-friendly subscription model, advanced technology solutions, and customer-focused service, we seamlessly integrate these innovations into daily business operations.
                    Our aim is to eliminate obstacles and simplify eSIM technology, allowing our customers to focus on their goals and connect effortlessly.
                </p>
                <p class="text-lg">
                    At Simlessly, excellence is our priority, committed to delivering outstanding products and services that exceed customer expectations.
                    Our customer-centric approach ensures quick responses to your needs and feedback, facilitating continuous improvement and enhancement of our offerings.
                </p>
            </div>
            <div class="<md:hidden grid place-items-center px-4">
                <img class="goal-pic" alt="" src="@/assets/imgs/about-goal.png" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.about-our-goal {
    color: #ffffff;
    background: linear-gradient(to bottom, $--color-theme, rgba($--color-theme, 0.6));
    .goal-pic {
        width: 100%;
        max-width: 24.5rem;
    }
}
</style>
