import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const post = await db.post.create({
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tagId
            }
        })
        return NextResponse.json(post, { status: 200 })
    }catch(e){
        return NextResponse.json({message: 'Could not create post '}, { status: 500 })
    }
}