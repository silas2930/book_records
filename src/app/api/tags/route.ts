import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try{
        const tags = await db.tag.findMany()
        return NextResponse.json(tags, { status: 200 })
    }catch(e){
        return NextResponse.json({message: 'Could not fetch tags '}, { status: 500 })
    }
}