const websitePort = location.port ? parseInt(location.port) : 7652

export let connectionState = $state({
  connected: false,
  retrying: false,
  port: websitePort,
})

