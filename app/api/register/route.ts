import getAdmin from "@/components/actions/getAdmin";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentAdmin = await getAdmin();

  if (!currentAdmin) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.admin.update({
    where: {
      id: currentAdmin.id,
    },
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
