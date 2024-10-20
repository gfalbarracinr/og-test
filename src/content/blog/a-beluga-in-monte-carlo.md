---
title: "A Beluga in Monte Carlo"
summary: Beluga is an open source implementation of particle filters written in C++17 that works as a drop-in replacement for AMCL ROS.
authors:
  - Nahuel Espinosa
slug: a-beluga-in-monte-carlo
thumbnail: /images/blog/a-beluga-in-monte-carlo/beluga-main.jpg
backgroundImage: /images/blog/a-beluga-in-monte-carlo/beluga-main.jpg
date: 2024-09-04
tags:
  - beluga
  - ros 2
---

# What is Beluga?


[Beluga](https://github.com/Ekumen-OS/beluga) is an implementation of [particle filters](https://en.wikipedia.org/wiki/Particle_filter) (non-parametric Bayesian state estimation algorithms) that can work as a drop-in replacement for existing AMCL ROS packages, improving computing efficiency. It is written in C++17 with modern features, testing, and extensibility in mind; the core library can also be used to solve problems other than localization. On top of all that, it’s open source!

The project ships with a battery of unit and integration tests that you can use as starting point to test your own code. It makes use of the [parallel algorithms](https://en.cppreference.com/w/cpp/algorithm/execution_policy_tag_t) from the C++17 Standard Template Library and composable algorithms from [Ranges-v3](https://github.com/ericniebler/range-v3) to significantly increase throughput compared to current implementations. In this way, existing functionality can be reused to implement your own MCL algorithm without sacrificing performance.

# How is a Beluga born?

<figure>
    <img src="/images/blog/a-beluga-in-monte-carlo/1024px-Delphinapterus_leucas_24.jpg">
    <figcaption>Figure 1: Beluga Vancouver Aquarium</figcaption>
</figure>

Beluga started out as an internal training project at [Ekumen](https://ekumenlabs.com/). The goal was to improve our collective knowledge of C++ by focusing on concurrency and high performance code. We identified the need for a general production-ready MCL package for the ROS ecosystem and thought it was a perfect fit for our training goals. The name was chosen as a nod to the remarkable navigational abilities of beluga whales; just as these whales elegantly navigate the ocean depths using their echolocation, the project aimed at giving robots a similar level of precision in understanding and maneuvering throughout their environments.

Shortly after its inception, the project caught the attention of Ekumen's Research and Development team, which is a group within the company dedicated to innovation and exploration of cutting-edge technologies. In order to create a concrete plan for the project for the next few months, we decided to focus on making Beluga an open source alternative and direct replacement for AMCL.

During development, we also shared the project with another internal group in the company: the Robocraft team. Their main focus is to build robots (yes, it’s as cool as it sounds!), to get real experience with hardware and firmware design, and to provide testing platforms for new algorithms and systems. They were able to deploy the Beluga localization package into [Andino](https://github.com/Ekumen-OS/andino), thus sharing a lot of useful feedback in the process.

The results after six months have been: a public repository open for the community to use and contribute to, many lessons learned about performance and maintainability, and great ideas to push it to the next level.

<figure>
    <img src="/images/blog/a-beluga-in-monte-carlo/beluga-small.jpg">
    <figcaption>Figure 2: Beluga AMCL running on a Jackal UGV</figcaption>
</figure>

# So... What's next?

We have great plans for Beluga! We’re confident it will continue to grow as a localization framework, as well as starting to make its way towards other exciting robotics applications, such as:

*  3D lidar-based localization
*  RGB camera-based localization
*  Fingerprinting for indoor positioning (WiFi, Magnetic)
*  Multi-camera tag-based 3DOF pose estimation
*  Lifelong occupancy mapping using a 2D lidar
*  Adaptive dynamics for model predictive control based on particle filters

# Try it out!

If you are interested in Beluga, check out the [GitHub repository](https://github.com/Ekumen-OS/beluga). There you will find tutorials, documentation, and [guidelines](https://github.com/Ekumen-OS/beluga/blob/main/CONTRIBUTING.md) created for you to make your own contribution. Feel free to report any bugs or issues.  