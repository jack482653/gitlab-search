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

for (const project of projects) {
  // Don't call the API too fast
  // TODO: Use a rate limiter
  await setTimeout(500, "wait");

  const results = await searchProject(project.id, { scope: "blobs", search });

  if (results.length > 0) {
    console.dir(results, { maxArrayLength: null });
  }
}
