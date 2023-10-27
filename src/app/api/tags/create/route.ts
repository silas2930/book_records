import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const tag = await db.tag.create({
            data: {
                name: body.name,
            }
        })
        return NextResponse.json(tag, { status: 200 })
    }catch(e){
        return NextResponse.json({message: 'Could not create tag '}, { status: 500 })
    }
}