const CoverImg = () => {
    let rand = Math.floor(Math.random() * 10);
    let image = [
    "public/random/0.png",
    "public/random/1.png",
    "public/random/2.png",
    "public/random/3.png",
    "public/random/4.png",
    "public/random/5.png",
    "public/random/6.png",
    "public/random/7.png",
    "public/random/8.png",
    "public/random/9.png"
    ];
    return image[rand]
}

export {CoverImg};