using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebAPI.Data;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class WordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WordController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Word>>> GetWords()
        {
            if (_context.Words == null)
                return NotFound();
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            return await _context.Words.Where(word => word.User.Email == userEmail).ToListAsync();
        }
            
        [HttpGet("{id}")]
        public async Task <ActionResult<Word>> GetWord(int id)
        {
            var word = await _context.Words.FindAsync(id);
            if (word == null)
                return NotFound();
            return word;
        }

        [HttpPost]

        public async Task <ActionResult<Word>> PostWord(Word word)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim != null)
            {
                int userId = Convert.ToInt32(userIdClaim);
                word.UserID = userId;
            }

            /*          word.User = null;*/ // Установка свойства User в null

            _context.Words.Add(word);
            await _context.SaveChangesAsync();  
            return CreatedAtAction(nameof(GetWord), new { id = word.ID}, word);
        }

      

        [HttpPut("{id}")]
        public async Task <ActionResult> PutWord(int id, Word word)
        {
            if (id != word.ID)
                return BadRequest();
            _context.Entry(word).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task <ActionResult> DeleteWord(int id)
        {
            if (_context.Words == null)
                return NotFound();
            var word = await _context.Words.FindAsync(id);
            if (word == null)
                return NotFound();
            _context.Words.Remove(word);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
