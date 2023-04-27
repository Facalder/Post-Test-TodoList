import { HStack, VStack, Text, Button, Modal, FormControl, Input } from "native-base";
import { useState } from "react";

export function TodoList({ todo, todoId, baseURL }) {
    const [showModal, setShowModal] = useState(false);
    const [newTodo, setNewTodo ] = useState('')

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: 'DELETE',
            })
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }

    const updateTodo = async (id) => { 
        try {
            const response = await fetch(`${baseURL}/${id}`, { 
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: newTodo})
            })
            return await response.json()
        } catch (error) {
            console.log(error) 
        }
    }

    return (
        <VStack space={4}>
            <HStack w="100%" justifyContent="space-between" alignItems="center">
                <Text flexShrink={1} textAlign="left" mx="2" >{todo}</Text>
                <HStack space={2}>
                    <Button size='sm' variant='outline' onPress={() => setShowModal(true)}>Update</Button>
                    <Button size='sm' onPress={() => deleteTodo(todoId)} >Delete</Button>
                </HStack>
            </HStack>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Update Todo</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Todo</FormControl.Label>
                            <Input onChangeText={(e) => setNewTodo(e)} value={newTodo}/>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                            }}>
                                Cancel
                            </Button>
                            <Button onPress={() => {
                                updateTodo(todoId)
                                setShowModal(false)
                            }}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </VStack>
    )
}