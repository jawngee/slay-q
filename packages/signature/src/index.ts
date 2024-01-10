import crypto from "crypto";

export function calcSig(body: any, secret: string) {
  function sortObject(obj: any) {
    return Object.keys(obj)
      .sort()
      .reduce((result: any, key) => {
        result[key] = obj[key] && typeof obj[key] === "object" ? sortObject(obj[key]) : obj[key];
        return result;
      }, {});
  }

  const hmac = crypto.createHmac("sha512", secret);
  hmac.update(JSON.stringify(body, sortObject({ ...body })));

  return hmac.digest("hex");
}
