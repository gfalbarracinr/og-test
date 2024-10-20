#!/bin/env python3

import random

tags = ['astro', 'c++', 'python', 'navigation', 'gazebo', 'ros', 'localization', 'typescript', 'nvidia', 'omniverse']

authors = ['John', 'Peter', 'Malkovich', 'Jane', 'Willy', 'Sherminator', 'Tom']


def get_result(n, choices):
  return set([random.choice(choices) for x in range(random.randint(1, n))])

def get_tags():
  return get_result(5, tags)

def get_authors():
  return get_result(3, authors)

for m in range(2):
  for i in range(3):
    with open(f'./src/content/blog/blog-post-2024-{m:02}-{i:02}.md', 'w') as f:
      f.write('---\n')
      f.write(f'title: "The greatest post of all time #{i}"\n')
      f.write('summary: This may be the greatest post of all time, but...\n')
      f.write('authors:\n')
      for x in get_authors():
        f.write(f'  - {x}\n')
      f.write(f'slug: blog-post-{m:02}-{i:02}\n')
      f.write(f'date: 2024-{m+1:02}-{i+1:02}\n')
      f.write('tags:\n')
      for x in get_tags():
        f.write(f'  - {x}\n')
      f.write('---\n')
      f.write('Here is my _great_ *post*!\n' * 150)
