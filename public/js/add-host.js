// Send POST to API to add host
async function addHost() {
  if (hostId.value === "" || hostAddress.value === "") {
    alert("Please fill in fields");
  }

  const sendBody = {
    hostId: hostId.value,
    address: hostAddress.value
  };

  try {
    const res = await fetch("/api/v1/hosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error("Host already exists.");
    }

    alert("host added");
  } catch (err) {
    alert(err);
  }
}
