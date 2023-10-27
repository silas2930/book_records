import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface contextProps{
    params: {
        postId: string
    }
}

export async function DELETE(req: Request, context: contextProps) {
    try{
        const { params } = context
        await db.post.delete({
            where: {
                id: params.postId
            }
        })
        return new Response(null, { status: 204 })
    }catch(e){
        return NextResponse.json({message: 'Could not delete post '}, { status: 500 })
    }
}

export async function PATCH(req: Request, context: contextProps) {
    try{
        const { params } = context
        const body = await req.json()

        await db.post.update({
            where: {
                id: params.postId
            },
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tagId,
            }
        })
        return NextResponse.json({message: 'Update successfuly '}, { status: 200 })

    }catch(e){
        return NextResponse.json({message: 'Could not update post ' + e}, { status: 500 })
    }
}

export async function GET(req: Request, context: contextProps) {
    const { params } = context;
    try{
        const post = await db.post.findFirst({
            where: {
                id: params.postId
            },
            include: {
                tag: true
            }
        })
        return NextResponse.json(post, { status: 200 })
    }catch(e){
        return NextResponse.json({message: 'Could not fetch data '}, { status: 500 })
    }
}