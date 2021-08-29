# WORK TOGETHER

- [Click here to see live website](https://work-together.netlify.app)
- [See on Github](https://github.com/david-sling/work-together)

## FEATURES

- Live data editing
- Calculations (use =)
  - Example: = 5 + 20 // prints 25
- Cell referencing (use #{})

  - Example: = #{r1c1} // prints value in R1C1
  - Example: = #{r1c1} + #{R2C2} // prints sum of values in R1C1 and R2C2

## HOW TO RUN

###### START CLIENT

```
git clone https://github.com/david-sling/work-together
cd work-together
npm start
```

###### START SERVER

```
git clone https://github.com/david-sling/work-together-socket
cd work-together-socket
npm run dev
```

## SERVER DETAILS

- [Repository](https://github.com/david-sling/work-together-socket)
- [Live](https://work-together-socket.herokuapp.com/)
