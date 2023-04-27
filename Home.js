import { Box, Button, Center, HStack, Heading, Input, VStack, Text } from "native-base";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";

export default function Home() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const baseURL = 'http://localhost:8080/Todos'

    useEffect(() => {
        const fetchTodo = async () => {
            try { 
                const response = await fetch(baseURL, {
                    method: 'GET'
                })
                const datas = await response.json()
                return setTodos(datas)
            }catch(error) { 
                console.log(error)
            }
        }

        fetchTodo()
    }, [])

    const addTodo = async () => {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: todo })
            })

            setTodo('')
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Center w="100%" flex={1} >
                <Box maxW="300" w="100%" >
                    <Heading size="md" mb="4">
                        Welcome, Fa Ainama Caldera
                    </Heading>
                    <VStack space={10}>
                        <HStack space={2}>
                            <Input flex={1} onChangeText={(todo) => setTodo(todo)} value={todo} />
                            <Button onPress={() => addTodo()} borderRadius="sm" variant="solid">Tambah Tugas</Button>
                        </HStack>
                        <FlatList
                            data={todos}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                               <TodoList todo={item.task} todoId={item.id} baseURL={baseURL}/>
                            )}
                        />
                    </VStack>
                </Box>
            </Center>
        </>
    )
}
