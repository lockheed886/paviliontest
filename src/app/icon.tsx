import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: "#040906",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20%",
                    border: "1px solid #8B6914",
                }}
            >
                {/* Simple geometric Gem representation */}
                <div
                    style={{
                        width: "16px",
                        height: "16px",
                        background: "linear-gradient(135deg, #A67C2E, #8B6914)",
                        transform: "rotate(45deg)",
                        boxShadow: "0 0 10px rgba(139, 105, 20,0.5)",
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
