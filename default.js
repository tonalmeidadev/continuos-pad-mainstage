var PluginParameters = [
  {
    name: 'Trigger',
    type: 'menu',
    valueStrings: ['Off', 'On'],
    minValue: 0,
    maxValue: 1,
    defaultValue: 0,
    numberOfSteps: 1,
  },
  {
    name: 'Tone',
    type: 'menu',
    valueStrings: [
      'A',
      'Bb',
      'B',
      'C',
      'Db',
      'D',
      'Eb',
      'E',
      'F',
      'Gb',
      'G',
      'Ab',
    ],
    minValue: 0,
    maxValue: 11,
    defaultValue: 0,
    numberOfSteps: 11,
  },
]

function HandleMIDI(event) {
  if (event instanceof NoteOn) {
    var cc = new ControlChange()

    cc.number = 64
    cc.value = 0
    cc.send()
    cc.trace()
    event.send()
    event.trace()
    cc.value = 127
    cc.send()
    cc.trace()
  }
  if (event instanceof NoteOff) {
    event.send()
    event.trace()
  }
}

function ParameterChanged() {
  var trigger = GetParameter('Trigger')

  var transpose = 0
  var vel = 127
  var dtype = 1

  if (trigger === 1) {
    var cc = new ControlChange()

    cc.number = 64
    cc.value = 0
    cc.send()

    var noteOn = new NoteOn()
    var noteOff = new NoteOff()

    switch (dtype) {
      case 0:
        noteOn.pitch = 57 + GetParameter('Tone') + transpose * 12
        noteOn.velocity = vel
        noteOn.send()
        noteOn.pitch = 57 + GetParameter('Tone') + 7 + transpose * 12
        noteOn.send()
        break

      case 1:
        noteOn.pitch = 57 + GetParameter('Tone') + transpose * 12
        noteOn.velocity = vel
        noteOn.send()
        noteOn.pitch = 57 + GetParameter('Tone') + 7 + transpose * 12
        noteOn.send()
        noteOn.pitch = 57 + GetParameter('Tone') + 12 + transpose * 12
        noteOn.send()
        break

      case 2:
        noteOn.pitch = 57 + GetParameter('Tone') - 12 + transpose * 12
        noteOn.velocity = vel
        noteOn.send()
        noteOn.pitch = 57 + GetParameter('Tone') + transpose * 12
        noteOn.send()
        noteOn.pitch = 57 + GetParameter('Tone') + 7 + transpose * 12
        noteOn.send()
        noteOn.pitch = 57 + GetParameter('Tone') + 12 + transpose * 12
        noteOn.send()
        break
    }

    cc.value = 127
    cc.send()

    switch (dtype) {
      case 0:
        noteOff.pitch = 57 + GetParameter('Tone') + transpose * 12
        noteOff.send()
        noteOff.pitch = 57 + GetParameter('Tone') + 7 + transpose * 12
        noteOff.send()
        break

      case 1:
        noteOff.pitch = 57 + GetParameter('Tone') + transpose * 12
        noteOff.send()
        noteOff.pitch = 57 + GetParameter('Tone') + 7 + transpose * 12
        noteOff.send()
        noteOff.pitch = 57 + GetParameter('Tone') + 12 + transpose * 12
        noteOff.send()
        break

      case 2:
        noteOff.pitch = 57 + GetParameter('Tone') - 12 + transpose * 12
        noteOff.send()
        noteOff.pitch = 57 + GetParameter('Tone') + transpose * 12
        noteOff.send()
        noteOff.pitch = 57 + GetParameter('Tone') + 7 + transpose * 12
        noteOff.send()
        noteOff.pitch = 57 + GetParameter('Tone') + 12 + transpose * 12
        noteOff.send()
        break
    }
  } else if (trigger === 0) {
    var cc = new ControlChange()

    cc.number = 64
    cc.value = 0
    cc.send()
  }
}
