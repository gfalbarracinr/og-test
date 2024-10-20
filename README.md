# Ekumen Website

https://ekumenlabs.com

---

## Dependencies

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Workflow

### Run locally

Make sure you are in the root of the directory and run:

```
make dev
```

### Build

To build the website, you can run the following command.

```
make build_docker
```

The output of it is inside the `public` folder, which is ignored in the repository. This is done in the Gitlab pipeline in order to deploy the website.

### Deploy

You can find deployment documentation in the wiki [here](https://gitlab.com/ekumenlabs/ekumen-website/-/wikis/Deployment-Pipeline-Runbook)

## Dev Notes

You can find the Dev Notes [here](DEV-NOTES.md).
