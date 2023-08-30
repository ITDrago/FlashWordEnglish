using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Word
    {
        [Key]
        public int ID { get; set; }

        public string? Text { get; set; }

        public string? Translate { get; set; }
        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }


    }
}
