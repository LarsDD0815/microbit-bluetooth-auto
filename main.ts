bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService()
})
bluetooth.onBluetoothDisconnected(function () {
    mecanumRobotV2.MotorenAnhalten()
    FrontLights = "false"
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    UARTParameters = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    mecanumRobotV2.stelleMotorenPerBluetooth(UARTParameters)
    FrontLights = UARTParameters.split("|")[4]
})
let UARTParameters = ""
let FrontLights = ""
FrontLights = "false"
led.enable(false)
basic.forever(function () {
    if (FrontLights == "true") {
        mecanumRobotV2.setLed(LED.Left, LEDColor.Rainbow)
        mecanumRobotV2.setLed(LED.Right, LEDColor.Rainbow)
    } else {
        mecanumRobotV2.setLed(LED.Left, LEDColor.Off)
        mecanumRobotV2.setLed(LED.Right, LEDColor.Off)
    }
})
