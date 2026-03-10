import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Image, StyleSheet, View, ScrollView } from "react-native"
import { Avatar, Banner, Button, Card, Chip, Text } from "react-native-paper";


export const Components = () => {
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation()
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    return (
        <ScrollView >
            <View style={styles.container}>
                <Banner
                    visible={visible}
                    actions={[
                        {
                            label: 'Fix it',
                            onPress: () => setVisible(false),
                        },
                        {
                            label: 'Learn more',
                            onPress: () => setVisible(false),
                        },
                        {
                            label: 'view once',
                            onPress: () => setVisible(false),
                        }
                    ]}
                    icon={({ size }) => (
                        <Image
                            source={{
                                uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
                            }}
                            style={{
                                width: size,
                                height: size,
                            }}
                        />
                    )}>
                    There was a problem processing a transaction on your credit card.
                </Banner>
                <Button mode="contained" style={{ margin: 20 }} theme={{ colors: { primary: 'brown' } }} onPress={() => navigation.navigate('PaperBottomTab')}>Bottom View</Button>
            </View>
            <Card style={{ margin: 20 }}>
                <Card.Title title="Card Title" left={LeftContent} />
                <Card.Content>
                    <Text variant="titleLarge">Card title</Text>
                    <Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam eius vel eveniet deleniti blanditiis error consequatur consequuntur nostrum, accusantium </Text>
                </Card.Content>
                <Card.Cover style={{ margin: 20 }} source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
            <View >
                <Button mode={"contained"} style={{ margin: 20 }} onPress={() => navigation.navigate('Form')}> Hook Form</Button>
                <Chip icon="information" >chip</Chip>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
})

