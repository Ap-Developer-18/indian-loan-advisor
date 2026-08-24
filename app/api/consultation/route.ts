import { sanityClient } from "@/utils/sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const doc = await sanityClient.create({
      _type: "consultation",
      fullName: body.fullName,
      state: body.state,
      phone: body.phone,
      loanType: body.loanType,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, doc });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));
    const search = searchParams.get("search")?.trim() || "";
    const loanType = searchParams.get("loanType")?.trim() || "";

    const offset = (page - 1) * limit;

    const conditions: string[] = [`_type == "consultation"`];

    if (search) {
      conditions.push(
        `(fullName match "*${search}*" || phone match "*${search}*")`,
      );
    }

    if (loanType && loanType !== "all") {
      conditions.push(`loanType == "${loanType}"`);
    }

    const filter = conditions.join(" && ");

    const [data, total, loanTypes] = await Promise.all([
      sanityClient.fetch(
        `*[${filter}] | order(createdAt desc) [${offset}...${offset + limit}] {
          _id,
          fullName,
          state,
          phone,
          loanType,
          createdAt
        }`,
      ),
      sanityClient.fetch(`count(*[${filter}])`),
      sanityClient.fetch(
        `array::unique(*[_type == "consultation" && defined(loanType)].loanType)`,
      ),
    ]);

    return NextResponse.json({
      success: true,
      data: data || [],
      total: total || 0,
      page,
      totalPages: Math.ceil((total || 0) / limit),
      loanTypes: loanTypes || [],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch" },
      { status: 500 },
    );
  }
}
