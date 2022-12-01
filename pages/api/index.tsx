export default async function handler(req: any, res: any): Promise<any> {
  res.send({
    version: 1.0,
    public: false,
  });
}
