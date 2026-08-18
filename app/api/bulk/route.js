export async function GET() {
  return Response.json(
    {
      success: false,
      error:
        "Bulk generation is not available through a public GET endpoint.",
    },
    { status: 405 }
  );
}
