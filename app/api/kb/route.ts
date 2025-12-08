import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://cr-engine.jnowlan21.workers.dev/api/kb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const clientId = searchParams.get("client_id");
  const authToken = request.headers.get("authorization");

  if (!clientId || !authToken) {
    return NextResponse.json(
      { error: "Missing client_id or authorization" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}?client_id=${clientId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authToken,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authToken = request.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json(
      { error: "Missing authorization" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const authToken = request.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json(
      { error: "Missing authorization" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(API_BASE_URL, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const authToken = request.headers.get("authorization");

  if (!id || !authToken) {
    return NextResponse.json(
      { error: "Missing id or authorization" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: authToken,
      },
    });

    if (response.ok) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
