export const generateStock=()=>{
    return Math.floor(Math.random()*16);
}

export const stockMessage=(stock)=>{
    if(stock >5)return 'In stock';
    if(stock >=2)return 'Only few items are left';
    if(stock==1)return "Only 1 item left";
    return 'Out of stock';
}