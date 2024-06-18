/**
 * @swagger
 * components:
 *  schemas:
 *      Student:
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
 *              is_international:
 *                  type: boolean
 *              physical_condition:
 *                  type: string
 *                  enum: ['سالم', 'دارای معلولیت']
 *              left_handed:
 *                  type: boolean
 *              acception_status:
 *                  type: string
 *                  enum: ['accepted', 'rejected', 'pending']
 *              accepted_field:
 *                  type: string
 *              accept_all_rules:
 *                  type: boolean
 */

/**
 * @swagger
 * /student/create:
 *  post:
 *      summary: Create a new student
 *      tags:
 *          - Students
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 *      responses:
 *          201:
 *              description: Student created successfully
 *          400:
 *              description: Invalid input, object invalid
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /student/list:
 *   get:
 *     summary: Fetch students with optional filters
 *     tags:
 *       - Students
 *     parameters:
 *       - name: first_name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by student name
 *       - name: national_code
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter by student age
 *       - name: phone_number
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by student grade
 *     responses:
 *       200:
 *         description: Students fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: fetch student
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student fetched successfully
 *       400:
 *         description: object invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /student/update/{id}:
 *   patch:
 *     summary: Update a student's details
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The student's UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Student updated successfully
 *                 updatedStudent:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid input, object invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid request parameters
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Student not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /student/delete/{id}:
 *   delete:
 *     summary: delete student
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The student's UUID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       400:
 *         description: object invalid
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /student/delete:
 *   delete:
 *     summary: delete all the students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       400:
 *         description: object invalid
 *       500:
 *         description: Internal server error
 */
