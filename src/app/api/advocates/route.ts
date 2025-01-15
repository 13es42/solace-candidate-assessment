import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  // Uncomment this line to use a database
  // add query here to get selected advocates
  const data = await db.select().from(advocates);

  // const data = advocateData;
  console.log('data', data);
  
  return Response.json({ data });
}
