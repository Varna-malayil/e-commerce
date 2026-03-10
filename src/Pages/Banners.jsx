import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

const BANNERS = [
    {
        id: "1",
        title: "Summer Collection",
        subtitle: "Up to 40% off on selected items",
        bg: "#1a1a2e",
        bgAlt: "#16213e",
        accent: "#e94560",
        emoji: "☀️",
    },
    {
        id: "2",
        title: "New Arrivals",
        subtitle: "Fresh drops every week",
        bg: "#0f3460",
        bgAlt: "#533483",
        accent: "#a78bfa",
        emoji: "✨",
    },
    {
        id: "3",
        title: "Flash Sale",
        subtitle: "Today only — don't miss out",
        bg: "#1b1b2f",
        bgAlt: "#2c2c54",
        accent: "#f5a623",
        emoji: "⚡",
    },
];

 export const BannerCarousel = () => {
    const pagerRef = useRef(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const next = (current + 1) % BANNERS.length;
            pagerRef.current?.setPage(next);
            setCurrent(next);
        }, 3500);

        return () => clearInterval(interval);
    }, [current]);


    return (
        <View style={bannerStyles.wrapper}>
            <PagerView
                ref={pagerRef}
                style={bannerStyles.pager}
                initialPage={0}
                onPageSelected={(e) => setCurrent(e.nativeEvent.position)}
            >
                {BANNERS.map((item) => (
                    <View key={item.id} style={[bannerStyles.banner, { backgroundColor: item.bg }]}>
                        <View style={[bannerStyles.circle1, { backgroundColor: item.bgAlt }]} />
                        <View style={[bannerStyles.circle2, { backgroundColor: item.bgAlt }]} />

                        <View style={bannerStyles.bannerContent}>
                            <Text style={bannerStyles.bannerEmoji}>{item.emoji}</Text>
                            <Text style={bannerStyles.bannerTitle}>{item.title}</Text>
                            <Text style={bannerStyles.bannerSub}>{item.subtitle}</Text>
                            <TouchableOpacity
                                style={[bannerStyles.bannerBtn, { backgroundColor: item.accent }]}
                                activeOpacity={0.8}
                            >
                                <Text style={bannerStyles.bannerBtnText}>Shop Now →</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </PagerView>

            <View style={bannerStyles.dots}>
                {BANNERS.map((_, i) => (
                    <View
                        key={i}
                        style={[bannerStyles.dot, i === current && bannerStyles.dotActive]}
                    />
                ))}
            </View>
        </View>
    );
    
};

const bannerStyles = StyleSheet.create({
    wrapper: {
        marginBottom: 8,
    },
    pager: {
        height: 170,
        borderRadius: 20,
        overflow: "hidden",
    },
    banner: {
        flex: 1,
        borderRadius: 20,
        padding: 24,
        overflow: "hidden",
        justifyContent: "center",
    },
    circle1: {
        position: "absolute",
        right: -40,
        top: -40,
        width: 160,
        height: 160,
        borderRadius: 80,
        opacity: 0.6,
    },
    circle2: {
        position: "absolute",
        right: 60,
        bottom: -50,
        width: 110,
        height: 110,
        borderRadius: 55,
        opacity: 0.4,
    },
    bannerContent: {
        zIndex: 2,
    },
    bannerEmoji: {
        fontSize: 30,
        marginBottom: 4,
    },
    bannerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: 0.4,
    },
    bannerSub: {
        fontSize: 13,
        color: "rgba(255,255,255,0.65)",
        marginTop: 3,
        marginBottom: 14,
    },
    bannerBtn: {
        alignSelf: "flex-start",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
    },
    bannerBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
        letterSpacing: 0.3,
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        gap: 5,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    dotActive: {
        width: 20,
        backgroundColor: "#e94560",
        borderRadius: 3,
    },
});