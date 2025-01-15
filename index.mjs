import { setTimeout } from "timers/promises";

import { getProjects, searchProject } from "./gitlab.mjs";

const search = process.argv[2];

if (search === undefined) {
  console.error("Please provide a search term");
  process.exit(1);
}

const projects = await getProjects({
  per_page: 100,
  order_by: "id",
  sort: "asc",
});

const projectNameMappings = {};

projects.forEach((project) => {
  projectNameMappings[project.id] = project.name;
});

for (const project of projects) {
  // Don't call the API too fast
  // TODO: Use a rate limiter
  await setTimeout(500, "wait");

  const results = await searchProject(project.id, { scope: "blobs", search });

  results.forEach((result) => {
    console.log(
      JSON.stringify({
        ...result,
        project_name: projectNameMappings[project.id],
      })
    );
  });
}
