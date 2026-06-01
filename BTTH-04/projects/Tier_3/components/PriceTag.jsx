function PriceTag({ originalPrice, salePrice }) {
    const hasDiscount = salePrice < originalPrice;
    const discountPercent = hasDiscount 
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : 0;

    return (
        <div style={{ fontFamily: "Arial", margin: "5px 0" }}>
            {hasDiscount ? (
                <>
                    <span style={{ 
                        textDecoration: "line-through", 
                        color: "#999",
                        marginRight: "10px"
                    }}>
                        {originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                    <span style={{ 
                        color: "#e74c3c", 
                        fontWeight: "bold",
                        fontSize: "1.2em"
                    }}>
                        {salePrice.toLocaleString('vi-VN')}₫
                    </span>
                    <span style={{ 
                        background: "#e74c3c", 
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        marginLeft: "10px",
                        fontSize: "0.8em"
                    }}>
                        -{discountPercent}%
                    </span>
                </>
            ) : (
                <span style={{ fontWeight: "bold" }}>
                    {originalPrice.toLocaleString('vi-VN')}₫
                </span>
            )}
        </div>
    );
}

export default PriceTag;