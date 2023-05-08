import getAdm from "@/components/actions/getAdm";
import getAdmin from "@/components/actions/getAdmin";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const currentAdmin = await getAdm();

  if (!currentAdmin) {
    return NextResponse.error();
  }
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      hashedPassword: hashedPassword,
      adminId: currentAdmin.id,
    },
  });
  return NextResponse.json(user);
}
