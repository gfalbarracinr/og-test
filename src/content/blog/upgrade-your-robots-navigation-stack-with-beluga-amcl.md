---
title: "Upgrade your robot's navigation stack with Beluga AMCL"
summary: Beluga AMCL is a drop-in replacement for Nav2 AMCL and a gateway to more advanced localization solutions for robotics.
authors:
  - Michel Hidalgo
slug: upgrade-your-robots-navigation-stack-with-beluga-amcl
thumbnail: /images/blog/upgrade-your-robots-navigation-stack-with-beluga-amcl/beluga-nav2-horiz.jpg
backgroundImage: /images/blog/upgrade-your-robots-navigation-stack-with-beluga-amcl/beluga-bkg.jpg
date: 2024-09-12
tags:
  - beluga
  - ros 2
  - nav2
---

<figure>
    <img src="/images/blog/upgrade-your-robots-navigation-stack-with-beluga-amcl/beluga-nav2-logos.jpg">
    <figcaption>Figure 1: Beluga and Nav2 logos</figcaption>
</figure>

**TL; DR** [Beluga](https://github.com/Ekumen-OS/beluga) AMCL is a drop-in replacement for [Nav2](https://github.com/ros-navigation/navigation2) AMCL on all [ROS (2)](https://docs.ros.org/) LTS distributions and a gateway to more advanced localization solutions for robotics   
applications using [Monte Carlo methods](https://en.wikipedia.org/wiki/Monte_Carlo_localization).

And that’s pretty much it. Are you crawling the web in hopes you can get your wheeled robot going using open source ROS 2 packages that are easy to understand and deploy, preferably well-maintained and active? And you need them right now? I feel you. Here’s another datapoint. Keep going. You may want to check [Fuse](https://github.com/locusrobotics/fuse), [KISS-ICP](https://github.com/PRBonn/kiss-icp), [SLAM Toolbox](https://github.com/SteveMacenski/slam_toolbox), [Cartographer ROS](https://github.com/ros2/cartographer_ros), and [RTAB Map](https://github.com/introlab/rtabmap_ros) too if you haven’t already.

Have 5 more minutes? Cool, let me explain why you should care about Beluga and Beluga AMCL.

## Why Modularity Matters

Nav2 is the de facto standard autonomy framework in ROS 2\. It covers the planning, control, and decision making needs of a wide range of robotics applications, typically but not limited to those leveraging mobile robots, from simple differential driven circular bases to legged humanoids. In all cases, some degree of spatial awareness is required. To define a goal, to plan and execute a route, to avoid collisions, a robot needs to know where it is in relation to its surroundings and the objects and people in it. Owing to its ROS (1) Navigation Stack legacy, the nature of successful robotics use cases in industry, and the overall direction of the project, it so happens that Nav2 bundles a variety of environment representations but a single localization solution: a 2D lidar-based AMCL implementation. Despite its age – the original codebase is from the early 2000s –, AMCL is a relatively simple and robust algorithm to improve on dead-reckoning estimates that continues to find its way into production. 

There are high hopes for what robotics and AI can deliver. That drives funding and market demand for promising research avenues and new business opportunities, to which research labs and companies are forced to adapt, further increasing the rate of innovation. That prototype you are building may soon become too small, too slow, too expensive, or too dumb to stand up to the competition, or plain inadequate if circumstances force a transition to another market niche. These perturbations take up a lot of time and resources to weather. A flexible, modular system is easier to bend than a monolithic one. This puts ROS (2) in a great position to serve the robotics industry. The same applies to Nav2: its plugin-based architecture and a plethora of open source plugins afford sudden course corrections. Well, almost. Localization and mapping have to be dealt with separately.

And that takes us to Beluga. Beluga is an open-source toolkit for Monte Carlo Localization (MCL) that started out as [a ground-up (re)implementation](/blog/posts/a-beluga-in-monte-carlo) of Nav2 AMCL, having seen many private forks in production over the years. Beluga AMCL, its 2D lidar-based AMCL variant, is equally easy to use with Nav2, but unlike its predecessor, it is modular and extensible by design. This translates into a well-defined path to change. A path, not the path. Beluga does not and will not exhaust all possible approaches to localization. It is only a structured approach to apply Bayesian ideas to state estimation in robotics. No more, no less.

Enough with generalities. Let me show you how easily you can use Beluga AMCL on a ROS 2 \+ Nav2 powered AMR.

## Using Beluga with Nav2

If you are already using Nav2 AMCL, you can just switch from `nav2_amcl` to `beluga_amcl` on launch. In [most cases](https://ekumen-os.github.io/beluga/packages/beluga_amcl/docs/ros2-reference.html#compatibility-notes), no other changes are necessary. Taking [nav2\_bringup](https://github.com/ros-navigation/navigation2/blob/jazzy/nav2_bringup/launch/localization_launch.py) as an example, the patch amounts to a grand total of 4 lines.

```py
--- a/nav2_bringup/launch/localization_launch.py
+++ b/nav2_bringup/launch/localization_launch.py
@@ -149,8 +149,8 @@ def generate_launch_description():
                 remappings=remappings,
             ),
             Node(
-                package='nav2_amcl',
-                executable='amcl',
+                package='beluga_amcl',
+                executable='amcl_node',
                 name='amcl',
                 output='screen',
                 respawn=use_respawn,
@@ -215,8 +215,8 @@ def generate_launch_description():
                 target_container=container_name_full,
                 composable_node_descriptions=[
                     ComposableNode(
-                        package='nav2_amcl',
-                        plugin='nav2_amcl::AmclNode',
+                        package='beluga_amcl',
+                        plugin='beluga_amcl::AmclNode',
                         name='amcl',
                         parameters=[configured_params],
                         remappings=remappings,
```

That roughly summarizes Beluga’s [Nav2 integration tutorial](https://ekumen-os.github.io/beluga/tutorials/nav2-integration.html), and what you’ll find in the [Beluga Nav2 integration demo](https://github.com/Ekumen-OS/beluga-demos/tree/main/integration/beluga_demo_nav2_integration). It is also how we got these fancy recordings.

<figure>
    <img src="/images/blog/upgrade-your-robots-navigation-stack-with-beluga-amcl/beluga-vs-nav2.real.gif">
    <figcaption>Video 1: Kobuki robot navigating at Ekumen HQ in Buenos Aires, Argentina</figcaption>
</figure>

<figure>
    <img src="/images/blog/upgrade-your-robots-navigation-stack-with-beluga-amcl/beluga-vs-nav2.sim.gif">
    <figcaption>Video 2: Kobuki robot navigating the Gazebo Classic sim twin of Ekumen HQ</figcaption>
</figure>

If you are not using Nav2 or even AMCL yet, head over to Beluga AMCL’s [user guide](https://ekumen-os.github.io/beluga/guides/using-beluga-amcl.html). To localize an AMR you will need an odometry source and a 2D lidar – to build a 2D map, and to localize on it. For other means of locomotion and sensing modalities you will have to wait a bit. An outline is there, but out-of-the-box support is not (yet).

---

That’s all for now. Hope Beluga can help you and your team bootstrap your up and coming robot. If you run into issues, please report them as soon as possible. If you need more features, [you can ask for them](https://github.com/Ekumen-OS/beluga/issues/new/choose) or you can develop. And if you don’t have a use for Beluga right now, you can follow [the project](https://github.com/Ekumen-OS/beluga) on GitHub. It’s under active development – you might find it useful later.
