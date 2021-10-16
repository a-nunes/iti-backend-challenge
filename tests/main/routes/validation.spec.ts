import { app } from '@/main/config/app'
import request from 'supertest'

describe('POST /api/validation', () => {
  it('should return 200 and true on success', async () => {
    const { status, body } = await request(app)
      .post('/api/validation')
      .send({ password: 'AbTp9!fok' })

    expect(status).toBe(200)
    expect(body).toBe(true)
  })

  it('should return 200 and false on success', async () => {
    const { status, body } = await request(app)
      .post('/api/validation')
      .send({ password: 'invalid_pass' })

    expect(status).toBe(200)
    expect(body).toBe(false)
  })
})
