import { json } from "@sveltejs/kit";

export function GET({ url }) {
  console.log('log endpoint Hit' )
  return json({ results: [{foo: 'bar'}] })
}