const Rotina = () => {
    return (
        <SafeAreaView style={estilosRotina.container_dia}>
            <Text style={estilosRotina.titulo_dia}>SEGUNDA-FEIRA</Text>

            <SafeAreaView style={estilosRotina.lista_tarefas}>
                <View /*SEG 01*/ style={estilosRotina.container_tarefa}>
                    <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s1'); }} style={estilosRotina.icon_tarefa}>
                        <Image style={estilosRotina.img_tarefa} source={s1[0]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s1')}>
                        <Text>{horarios[0][0]} </Text>
                    </TouchableOpacity>
                </View>

                <View /*SEG 02*/ style={estilosRotina.container_tarefa}>
                    <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s2'); }} style={estilosRotina.icon_tarefa}>
                        <Image style={estilosRotina.img_tarefa} source={s2[0]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s2')}>
                        <Text>{horarios[0][1]}</Text>
                    </TouchableOpacity>
                </View>

                <View /*SEG 03*/ style={estilosRotina.container_tarefa}>
                    <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s3'); }} style={estilosRotina.icon_tarefa}>
                        <Image style={estilosRotina.img_tarefa} source={s3[0]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s3')}>
                        <Text>{horarios[0][2]}</Text>
                    </TouchableOpacity>
                </View>

                <View /*SEG 04*/ style={estilosRotina.container_tarefa}>
                    <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s4'); }} style={estilosRotina.icon_tarefa}>
                        <Image style={estilosRotina.img_tarefa} source={s4[0]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s4')}>
                        <Text>{horarios[0][3]}</Text>
                    </TouchableOpacity>
                </View>

                <View /*SEG 05*/ style={estilosRotina.container_tarefa}>
                    <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s5'); }} style={estilosRotina.icon_tarefa}>
                        <Image style={estilosRotina.img_tarefa} source={s5[0]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s5')}>
                        <Text>{horarios[0][4]}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

