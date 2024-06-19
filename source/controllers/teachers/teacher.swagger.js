/**
 * @swagger
 * components:
 *  schemas:
 *      Teacher:
 *          type: object
 *          properties:
 *              first_name:
 *                  type: string
 *              last_name:
 *                  type: string
 *              father_name:
 *                  type: string
 *              phone_number:
 *                  type: string
 *              national_code:
 *                  type: string
 *              personal_code:
 *                  type: string
 *              birth_date:
 *                  type: string
 *                  format: date
 *              birth_province:
 *                  type: string
 *              birth_city:
 *                  type: string
 *              religion:
 *                  type: string
 *                  enum: ['اسلام', 'مسیحیت', 'یهودیت', 'هندوئیسم', 'بودیسم', 'سایر']
 *              field:
 *                  type: string
 *                  enum: ['برق', 'مکانیک', 'چوب']
 *              license_grade:
 *                  type: string
 *                  enum: ['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکتری']
 */

/**
 * @swagger
 * /teacher/create:
 *  post:
 *      summary: Create a new Teacher
 *      tags:
 *          - Teachers
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Teacher'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Teacher'
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Teacher'
 *      responses:
 *          201:
 *              description: Teacher created successfully
 *          400:
 *              description: Invalid input, object invalid
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /teacher/list:
 *   get:
 *     summary: Fetch teachers with optional filters
 *     tags:
 *       - Teachers
 *     parameters:
 *       - name: first_name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by teacher first name
 *       - name: national_code
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter by teacher national code
 *       - name: personal_code
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by teacher personal code
 *     responses:
 *       200:
 *         description: Students fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: fetch teacher
 *     tags:
 *       - Teachers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher fetched successfully
 *       400:
 *         description: object invalid
 *       500:
 *         description: Internal server error
 */
