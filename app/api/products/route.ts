import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      console.error("Failed to fetch products:", response.statusText);
      return NextResponse.error();
    }
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}
