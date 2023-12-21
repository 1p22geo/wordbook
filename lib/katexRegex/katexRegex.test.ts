/**
 * @jest-environment node
 */

import { katexRegex } from "."


describe("/lib/katexRegex", () => {
    it("replaces a string correctly", () => {
        expect(katexRegex(`
        Good morning
        \`\`\`KaTeX
        f(x) = ax^2 + bx + c
        \`\`\`
        this is a great world to live in
        `)).toBe(
            `
        Good morning
        $$ 
        f(x) = ax^2 + bx + c
        $$
        this is a great world to live in
        `
        )
    })
    it("returns a string with no math", () => {
        expect(katexRegex(`
        la de da de day oh  
        when did all the good times go
        la de da de day oh
        where did all the bad times rolll
        `)).toBe(`
        la de da de day oh  
        when did all the good times go
        la de da de day oh
        where did all the bad times rolll
        `
        )
    })
    it("respects KaTeX math symbols", () => {
        expect(katexRegex(`
        la de da de day oh  
        when did all the good times go
        $$
        f(x) = ax^2 + bx + c 
        $$
        la de da de day $\alpha$ oh
        where did all the bad times rolll
        `)).toBe(`
        la de da de day oh  
        when did all the good times go
        $$
        f(x) = ax^2 + bx + c 
        $$
        la de da de day $\alpha$ oh
        where did all the bad times rolll
        `
        )
    })
    it("doesn't change the string", () => {
        const str = `
        la de da de day oh  
        when did all the good times go
        la de da de day oh
        where did all the bad times rolll
        `;

        expect(katexRegex(str)).toBe(str)
    })
})