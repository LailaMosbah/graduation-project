async function requestPresign(file, userId) {
  const Vite_API_URL = "https://otuxwl1qre.execute-api.us-east-1.amazonaws.com";
  console.log(Vite_API_URL);
  console.log(`${Vite_API_URL}/uploads/presign`);

  const res = await fetch(`${Vite_API_URL}/uploads/presign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      contentType: file.type,
      originalName: file.name,
    }),
  });

  if (!res.ok) {
    throw new Error("presign failed");
  }

  return res.json();
  // {url,fileds;{key,policy,x-amz-signature},key,uploadId}
}

export async function uploadToS3(file, userId) {
  const { url, fields, key, uploadId } = await requestPresign(file, userId);

  const form = new FormData();
  // S3 doesn't accept JSON, it must be multipart/form-data (FormData)

  Object.entries(fields).forEach(([k, v]) => {
    form.append(k, v);
  });

  form.append("file", file); //file name

  const up = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!up.ok) {
    throw new Error("upload failed");
  }

  return { key, uploadId };
}
