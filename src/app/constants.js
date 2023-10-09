let URL = process.env.NEXT_PUBLIC_APP_URL;

if (URL === undefined) {
  URL = "http://localhost:3000";
}

export { URL };
